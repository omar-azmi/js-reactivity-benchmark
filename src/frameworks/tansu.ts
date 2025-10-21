import { batch, computed, writable } from "@amadeus-it-group/tansu"
import type { ReactiveFramework } from "../util/reactiveFramework.ts"

let toCleanup: (() => void)[] = []
export const tansuFramework: ReactiveFramework = {
  name: "amadeus-it-group/tansu",
  signal: (initialValue) => {
    const w = writable(initialValue)
    return {
      write: (v) => w.set(v),
      read: () => w(),
    }
  },
  computed: (fn) => {
    const c = computed(fn)
    return {
      read: () => c(),
    }
  },
  effect: (fn) => toCleanup.push(computed(fn).subscribe(() => { })),
  withBatch: (fn) => batch(fn),
  withBuild: (fn) => fn(),
  cleanup: () => {
    for (const cleanup of toCleanup) {
      cleanup()
    }
    toCleanup = []
  },
}
