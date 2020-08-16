import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import bs from "browser-sync";
import del from "del";
import glob from "glob";
import { dest, lastRun, parallel, series, src, task, watch } from "gulp";
import gulpIf from "gulp-if";
import imagemin from "gulp-imagemin";
import pug from "gulp-pug";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import { join } from "path";
import { rollup, RollupCache } from "rollup";
import { terser } from "rollup-plugin-terser";
import SASS from "sass";
import { data } from "./config/Data";
import { initIcons } from "./config/FontAwesome";
import { markdown } from "./config/Markdown";

let isProduction = process.env.NODE_ENV === "production";

const FontAwesomeFonts = [
    require.resolve("@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff2"),
    require.resolve("@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2")
];

(sass as any).compiler = SASS;

const getIcon = initIcons();

let DATA: any = {};

task("data", () => {
    return src("data/**/*.json", { since: lastRun("data") })
        .pipe(data("src/templates/**/*.pug", () => DATA, (data) => DATA = data));
});

task("clean", () => {
    return del("dist");
});

task("web", () => {
    return src("CNAME")
        .pipe(dest("dist"));
});

task("images", () => {
    return src("assets/**/*.{png,jp?(e)g,svg,gif,ico}", {
        since: lastRun("images"),
        ignore: ["**/_*", "**/sources/**", "assets/favicon.ico"]
    })
        .pipe(gulpIf(isProduction, imagemin()))
        .pipe(dest("dist/assets"));
});

task("favicon", () => {
    return src("assets/favicon.ico", { since: lastRun("favicon") })
        .pipe(gulpIf(isProduction, imagemin()))
        .pipe(dest("dist"));
});

task("fonts", () => {
    return src(["assets/fonts/**"].concat(FontAwesomeFonts), { since: lastRun("fonts") })
        .pipe(dest("dist/assets/fonts"));
});

task("pug", () => {
    return src("src/templates/pages/**/*.pug")
        .pipe(pug({
            cache: true,
            pretty: !isProduction,

            locals: {
                data: DATA,
                site: DATA.site,

                icon: getIcon,

                glob(pattern: string) {
                    return glob.sync(pattern).map((path) => join("/", path));
                },

                markdown,

                menuEntry: null,
                css: null,
                js: null
            },

            filters: {
                markdown
            }
        }))
        .pipe(dest("dist"));
});

task("sass", () => {
    return src(["src/styles/**/*.scss", "!**/_*"])
        .pipe(gulpIf(!isProduction, sourcemaps.init()))
        .pipe(sass({
            outputStyle: isProduction ? "compressed" : "expanded"
        }))
        .pipe(gulpIf(!isProduction, sourcemaps.write()))
        .pipe(dest("dist/styles"));
});

let rollupCache: RollupCache;

task("typescript", async () => {
    const bundle = await rollup({
        input: glob.sync("src/scripts/*.ts"),
        cache: rollupCache,
        plugins: [
            nodeResolve(),
            commonjs({
                transformMixedEsModules: true
            }),
            typescript()
        ].concat(isProduction ? [terser()] : [])
    });

    if (bundle.cache) rollupCache = bundle.cache;

    await bundle.write({
        dir: "dist/scripts",
        format: "iife",
        sourcemap: !isProduction
    });
});

task("build:init", (done) => {
    process.env.NODE_ENV = "production";
    isProduction = true;

    done();
});

task("dev:init", (done) => {
    process.env.NODE_ENV = "development";
    isProduction = false;

    done();
});

task("serve", () => {
    watch("data/**", task("data"));
    watch("assets/**", assets);
    watch("src/templates/**", task("pug"));
    watch("src/styles/**", task("sass"));
    watch("src/scripts/**", task("typescript"));

    bs.init({
        server: "dist",
        watch: true
    });
});

const templates = series("data", "pug"),
    assets = parallel("images", "favicon", "fonts"),
    common = parallel(assets, templates, "sass", "typescript");

export const build = series("build:init", "clean", "web", common);
export const dev = series("dev:init", "clean", common, "serve");
