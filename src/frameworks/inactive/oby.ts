import $ from "oby"
import type { ReactiveFramework } from "../../util/reactiveFramework.ts"

export const obyFramework: ReactiveFramework = {
  name: "Oby",
  signal: (initialValue) => {
    const observable = $(initialValue)
    return {
      write: (v) => observable(v),
      read: () => observable(),
    }
  },
  computed: (fn) => {
    const memo = $.memo(fn)
    return {
      read: () => memo(),
    }
  },
  effect: (fn) => $.effect(fn),
  withBatch: (fn) => {
    fn()
    $.tick()
  },
  withBuild: (fn) =>
    $.root((dispose) => {
      obyFramework.cleanup = dispose
      return fn()
    }),
  cleanup: () => { },
}
