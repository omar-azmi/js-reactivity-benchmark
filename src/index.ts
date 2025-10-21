import { cellxbench } from "./benches/cellxBench.ts"
import { kairoBench } from "./benches/kairoBench.ts"
import { dynamicBench } from "./benches/reactively/dynamicBench.ts"
import { sbench } from "./benches/sBench.ts"
import { promiseDelay } from "./util/asyncUtil.ts"
import type { FrameworkInfo } from "./util/frameworkTypes.ts"
import type { PerfResultCallback } from "./util/perfLogging.ts"

export { allFrameworks, frameworkInfo } from ".//frameworksList.ts"
export {
    formatPerfResult, perfResultHeaders, type PerfResult, type PerfResultCallback, type PerfResultStrings
} from "./util/perfLogging.ts"
export type { ReactiveFramework } from "./util/reactiveFramework.ts"
export type { FrameworkInfo }

export async function runTests(
  frameworkInfo: FrameworkInfo[],
  logPerfResult: PerfResultCallback,
) {
  await promiseDelay(0)

  for (const { framework } of frameworkInfo) {
    await sbench(framework, logPerfResult)
    await promiseDelay(1000)
  }

  await kairoBench(frameworkInfo, logPerfResult)

  await cellxbench(frameworkInfo, logPerfResult)
  await promiseDelay(1000)

  await dynamicBench(frameworkInfo, logPerfResult)
  await promiseDelay(1000)
}
