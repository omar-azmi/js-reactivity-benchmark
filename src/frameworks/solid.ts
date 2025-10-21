import { batch, createEffect, createMemo, createRoot, createSignal } from "solid-js/dist/solid.cjs"
import type { ReactiveFramework } from "../util/reactiveFramework.ts"

export const solidFramework: ReactiveFramework = {
  name: "SolidJS",
  signal: (initialValue) => {
    const [getter, setter] = createSignal(initialValue)
    return {
      write: (v) => setter(v as any),
      read: () => getter(),
    }
  },
  computed: (fn) => {
    const memo = createMemo(fn)
    return {
      read: () => memo(),
    }
  },
  effect: (fn) => createEffect(fn),
  withBatch: (fn) => batch(fn),
  withBuild: (fn) =>
    createRoot((dispose) => {
      solidFramework.cleanup = dispose
      return fn()
    }),
  cleanup: () => { },
}
