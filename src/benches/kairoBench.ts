import { nextTick } from "../util/asyncUtil.ts"
import { fastestTest } from "../util/benchRepeat.ts"
import type { FrameworkInfo } from "../util/frameworkTypes.ts"
import type { PerfResultCallback } from "../util/perfLogging.ts"
import { avoidablePropagation } from "./kairo/avoidable.ts"
import { broadPropagation } from "./kairo/broad.ts"
import { deepPropagation } from "./kairo/deep.ts"
import { diamond } from "./kairo/diamond.ts"
import { mol } from "./kairo/molBench.ts"
import { mux } from "./kairo/mux.ts"
import { repeatedObservers } from "./kairo/repeated.ts"
import { triangle } from "./kairo/triangle.ts"
import { unstable } from "./kairo/unstable.ts"

declare const gc: () => void
declare namespace globalThis { var gc: (() => void) | undefined }

const cases = [
  { name: "avoidablePropagation", fn: avoidablePropagation },
  { name: "broadPropagation", fn: broadPropagation },
  { name: "deepPropagation", fn: deepPropagation },
  { name: "diamond", fn: diamond },
  { name: "mux", fn: mux },
  { name: "repeatedObservers", fn: repeatedObservers },
  { name: "triangle", fn: triangle },
  { name: "unstable", fn: unstable },
  { name: "molBench", fn: mol },
]

export async function kairoBench(
  frameworkInfo: FrameworkInfo[],
  logPerfResult: PerfResultCallback,
) {
  // warmup
  for (const c of cases) {
    for (const { framework } of frameworkInfo) {
      const iter = framework.withBuild(() => c.fn(framework))

      iter()
      iter()

      await nextTick()
      iter()

      framework.cleanup()
    }
  }

  if (globalThis.gc) (globalThis.gc!(), globalThis.gc!())
  await nextTick()

  // actual benchmark
  for (const c of cases) {
    for (const { framework } of frameworkInfo) {
      const iter = framework.withBuild(() => {
        const iter = c.fn(framework)
        return iter
      })

      iter()
      iter()
      await nextTick()

      iter()
      await nextTick()

      const { time } = await fastestTest(10, () => {
        for (let i = 0; i < 500; i++) {
          iter()
        }
      })

      framework.cleanup()
      if (globalThis.gc) (gc!(), gc!())

      logPerfResult({
        framework: framework.name,
        test: c.name,
        time,
      })
    }
  }
}
