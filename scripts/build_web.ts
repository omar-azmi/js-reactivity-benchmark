import { denoPlugins } from "@oazmi/esbuild-plugin-deno"
import { fileUrlToLocalPath } from "@oazmi/kitchensink/pathman"
import esbuild from "esbuild"


await esbuild.build({
  absWorkingDir: fileUrlToLocalPath(import.meta.resolve("../web/")),
  entryPoints: ["./index.ts", "./index.html", "./public/**/*"],
  outdir: "../web-dist/",
  loader: {
    ".png": "copy",
    ".html": "copy",
  },
  plugins: denoPlugins({
    autoInstall: "deno-noscript",
    initialPluginData: { runtimePackage: "../" },
    // log: true,
  }),
  format: "esm",
  target: "esnext",
  sourcemap: true,
  bundle: true,
  minify: true,
})
