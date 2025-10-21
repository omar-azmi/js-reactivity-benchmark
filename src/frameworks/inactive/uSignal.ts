import { batch, computed, effect, signal } from "usignal"
import type { ReactiveFramework } from "../../util/reactiveFramework.ts"

let toCleanup: (() => void)[] = []
export const usignalFramework: ReactiveFramework = {
  name: "uSignal",
  signal: (initialValue) => {
    const s = signal(initialValue)
    return {
      write: (v) => (s.value = v),
      read: () => s.value,
    }
  },
  computed: (fn) => {
    const c = computed(fn)
    return {
      read: () => c.value,
    }
  },
  effect: (fn) => toCleanup.push(effect(fn)),
  withBatch: (fn) => batch(fn),
  withBuild: (fn) => fn(),
  cleanup: () => {
    for (const cleanup of toCleanup) {
      cleanup()
    }
    toCleanup = []
  },
}
