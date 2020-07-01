const { readFileSync } = require("fs");
const { join: joinPath, parse: parsePath } = require("path").posix;

const chokidar = require("chokidar");
const glob = require("glob");
const MarkdownIt = require("markdown-it");
const touch = require("touch");
const { parse: parseYaml } = require("yaml");

const { object, string, dict } = require("@mojotech/json-type-validation");

const isProduction = !process.env.NODE_ENV_FPARCEL;
console.log(`Pug config environment is ${isProduction ? "production" : "development"}`);

/**
 * Find FontAwesome free icon by name. Search for icons here: https://fontawesome.com/icons?d=gallery&m=free
 * @param {string} name FontAwesome Free icon name
 * @returns Found icon or placeholder code
 */
const getIcon = (() => {
    const iconsPath = require.resolve("@fortawesome/fontawesome-free/metadata/icons.yml");
    const iconsRaw = readFileSync(iconsPath, { encoding: "utf-8" });
    const iconsParsed = parseYaml(iconsRaw);

    const ICONS = dict(object({
        unicode: string()
    })).runWithException(iconsParsed);

    return (
        /** @param {string} name */
        (name) => {
            const icon = ICONS[name] || ICONS["exclamation-circle"];

            return `&#x${icon.unicode};`;
        }
    );
})();

const DATA = (() => {
    /** @type {Record<string, any>} */
    const HOLDER = {};

    /** @type {Record<string, any>} */
    const DATA_CACHE = {};

    /** @param {string} path */
    function processJson(path) {
        const jsonFile = readFileSync(`./data/${path}`, { encoding: "utf-8" });
        const json = JSON.parse(jsonFile);
        const parsed = parsePath(path);

        const updated = { path: ["DATA"], object: null };

        joinPath(parsed.dir, parsed.name).split("/").reduce((prev, curr, index, arr) => {
            if (index == arr.length - 1) {
                const cache = DATA_CACHE[path];

                if (cache) {
                    /** @type {any[]} */
                    const arr = prev[curr];

                    if (Array.isArray(cache)) {
                        cache.forEach((item) => {
                            const itemIndex = arr.indexOf(item);

                            if (itemIndex > -1) {
                                arr.splice(itemIndex, 1);
                            }
                        });
                    } else {
                        Object.keys(cache).forEach((key) => {
                            delete prev[curr][key];
                        });
                    }
                }

                prev[curr] = Array.isArray(json) ? [].concat(prev[curr] || [], json) : Object.assign(prev[curr] || {}, json);
                updated.object = prev[curr];
            } else {
                prev[curr] = prev[curr] || {};
            }

            updated.path.push(curr);
            return prev[curr];
        }, HOLDER);

        DATA_CACHE[path] = json;

        return updated;
    }

    /** @param {string} path */
    function deleteObject(path) {
        const parsed = parsePath(path);

        let objectPath = "DATA";

        joinPath(parsed.dir, parsed.name).split("/").reduce((prev, curr, index, arr) => {
            if (index == arr.length - 1) {
                if (DATA_CACHE[path]) {
                    Object.keys(DATA_CACHE[path]).forEach((key) => {
                        delete prev[curr][key];
                    });

                    if (!Object.keys(prev[curr]).length) {
                        delete prev[curr];
                    }
                }
            }

            objectPath += `.${curr}`;
            return prev[curr];
        }, HOLDER);

        delete DATA_CACHE[path];

        return objectPath;
    }

    glob.sync("**/*.json", { cwd: "data" }).forEach((path) => {
        processJson(path);
    });

    if (process.env.NODE_ENV !== "production") {
        /** @param {string} path */
        const update = (path) => {
            const updated = processJson(path);

            if (process.env.NODE_ENV == "debug") {
                console.log(`Updated object "${updated.path.join(".")}":`, updated.object);
            }

            touch("./src/layout.pug", { nocreate: true });
        };

        const watcher = chokidar.watch("**/*.json", {
            cwd: "data",
            awaitWriteFinish: true,
            ignoreInitial: true
        });

        watcher
            .on("add", update)
            .on("change", update)
            .on("unlink", (path) => {
                const deletedPath = deleteObject(path);

                if (process.env.NODE_ENV == "debug") {
                    console.log(`Deleted object "${deletedPath}"`);
                    console.log("New DATA object:", HOLDER);
                }

                touch("./src/layout.pug", { nocreate: true });
            });
    }

    return HOLDER;
})();

const GALLERY = (() => {
    const PATTERN = "assets/pages/gallery/screenshots/*";

    const FILES = glob.sync(PATTERN, { nodir: true })
        .map((value) => joinPath("~/", value));

    if (process.env.NODE_ENV !== "production") {
        const watcher = chokidar.watch(PATTERN, {
            awaitWriteFinish: true,
            ignoreInitial: true
        });

        watcher.on("all", (event, path) => {
            path = joinPath("~/", path);

            const i = FILES.indexOf(path);

            if (event === "unlink" && i > -1) {
                FILES.splice(i, 1);
            } else if (i == -1) {
                FILES.push(path);
            }

            touch("./src/pages/gallery/index.pug", { nocreate: true });
        });
    }

    return FILES;
})();


/** @param {string} text */
function slugify(text) {
    return encodeURIComponent(text.replace(/\s+/g, "-").replace(/(!|\?)/g, "").toLowerCase());
}

const SITE = DATA.site;
SITE.menu = DATA.menu;

const md = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true
});

md.use(require("markdown-it-attrs"));

md.use(require("markdown-it-anchor"), {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: "§",
    slugify
});

md.use(require("markdown-it-toc-done-right"), {
    listType: "ul",
    slugify
});

/**
 * @param {string} text
 * @param {{
 *     inline?: boolean
 * }} options
 */
function markdown(text, options = {}) {
    if (options.inline) return md.renderInline(text);
    return md.render(text);
}

module.exports = {
    locals: {
        markdown,

        dev: !isProduction,
        currentYear: new Date().getFullYear(),

        getIcon,

        getMenuList() {
            return Object.keys(DATA.menu);
        },

        /** @param {string} name */
        getMenuEntry(name) {
            const path = SITE.menu[name];
            if (isProduction || path == "/") return path;
            return joinPath(path, "index.pug");
        },

        menuEntry: null,
        css: null,
        js: null,

        site: SITE,
        data: DATA,

        gallery: GALLERY
    },
    filters: {
        markdown
    }
};
