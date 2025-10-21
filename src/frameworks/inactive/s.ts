import _S from "s-js"
import type { ReactiveFramework } from "../../util/reactiveFramework.ts"

const S: typeof _S["default"] = _S as any
export const sFramework: ReactiveFramework = {
  name: "s-js",
  signal: (initial) => {
    const data = S.value(initial)
    return {
      read: () => data(),
      write: (v) => data(v),
    }
  },
  computed: (fn) => {
    const computed = S(fn)
    return {
      read: () => computed(),
    }
  },
  effect: (fn) => S(fn),
  withBatch: (fn) => S.freeze(fn),
  withBuild: (fn) =>
    S.root((dispose) => {
      sFramework.cleanup = dispose
      return fn()
    }),
  cleanup: () => { },
}
