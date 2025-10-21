import { alienFramework } from "./frameworks/alienSignals.ts"
import { angularFramework as angularFramework2 } from "./frameworks/angularSignals2.ts"
import { compostateFramework } from "./frameworks/inactive/compostate.ts"
import { mobxFramework } from "./frameworks/inactive/mobx.ts"
import { sFramework } from "./frameworks/inactive/s.ts"
import { usignalFramework } from "./frameworks/inactive/uSignal.ts"
import { vueReactivityFramework } from "./frameworks/inactive/vueReactivity.ts"
import { potaFramework } from "./frameworks/pota.ts"
import { preactSignalFramework } from "./frameworks/preactSignals.ts"
import { reactivelyFramework } from "./frameworks/reactively.ts"
import { solidFramework } from "./frameworks/solid.ts"
import { svelteFramework } from "./frameworks/svelte.ts"
import { tansuFramework } from "./frameworks/tansu.ts"
import { xReactivityFramework } from "./frameworks/xReactivity.ts"
import type { FrameworkInfo } from "./util/frameworkTypes.ts"

// Currently failing kairoBench tests
// import { molWireFramework } from "./frameworks/molWire.ts"

// Disabled until cleanup performance is fixed
// import { tc39SignalsFramework } from "./frameworks/tc39signals.ts"

// Currently failing cellx tests
// import { obyFramework } from "./frameworks/inactive/oby.ts"

export const frameworkInfo: FrameworkInfo[] = [
  { framework: alienFramework, testPullCounts: true },
  { framework: angularFramework2, testPullCounts: true },
  { framework: compostateFramework, testPullCounts: true },
  { framework: mobxFramework, testPullCounts: true },
  { framework: preactSignalFramework, testPullCounts: true },
  { framework: reactivelyFramework, testPullCounts: true },
  { framework: sFramework },
  { framework: solidFramework }, // solid can't testPullCounts because batch executes all leaf nodes even if unread
  { framework: potaFramework },
  { framework: svelteFramework, testPullCounts: true },
  { framework: tansuFramework, testPullCounts: true },
  { framework: vueReactivityFramework, testPullCounts: true },
  { framework: xReactivityFramework, testPullCounts: true },
]

export const allFrameworks: FrameworkInfo[] = [
  { framework: alienFramework, testPullCounts: true },
  { framework: angularFramework2, testPullCounts: true },
  { framework: compostateFramework, testPullCounts: true },
  { framework: mobxFramework, testPullCounts: true },
  // { framework: molWireFramework, testPullCounts: true },
  // { framework: obyFramework, testPullCounts: true },
  { framework: preactSignalFramework, testPullCounts: true },
  { framework: reactivelyFramework, testPullCounts: true },
  { framework: sFramework },
  { framework: solidFramework }, // solid can't testPullCounts because batch executes all leaf nodes even if unread
  { framework: potaFramework },
  { framework: svelteFramework, testPullCounts: true },
  { framework: tansuFramework, testPullCounts: true },
  // { framework: tc39SignalsFramework, testPullCounts: true },
  { framework: usignalFramework, testPullCounts: true },
  { framework: vueReactivityFramework, testPullCounts: true },
  { framework: xReactivityFramework, testPullCounts: true },
]
