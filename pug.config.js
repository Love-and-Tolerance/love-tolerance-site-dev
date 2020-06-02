const { readFileSync } = require("fs");
const { join: joinPath, parse: parsePath } = require("path");

const chokidar = require("chokidar");
const glob = require("glob");
const MarkdownIt = require("markdown-it");
const touch = require("touch");
const { parse: parseYaml } = require("yaml");

const isProduction = process.env.NODE_ENV === "production";

const ICONS = {};

{
    const iconsPath = require.resolve("@fortawesome/fontawesome-free/metadata/icons.yml");
    const iconsYaml = readFileSync(iconsPath, { encoding: "utf-8" });
    const iconsParsed = parseYaml(iconsYaml);

    Object.keys(iconsParsed).forEach((name) => {
        /** @type {string[]} */
        const styles = iconsParsed[name].styles;

        if (styles.some((type) => /^(solid|brands)$/.test(type))) {
            ICONS[name] = `&#x${iconsParsed[name].unicode};`;
        }
    });
}

const DATA = {};

const DATA_CACHE = {};

/** @param {string} path */
function processJson(path) {
    const jsonFile = readFileSync(`./data/${path}`, { encoding: "utf-8" });
    const json = JSON.parse(jsonFile);
    const parsed = parsePath(path);

    const updated = { path: "DATA", object: null };

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

        updated.path += `.${curr}`;
        return prev[curr];
    }, DATA);

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
    }, DATA);

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
            console.log(`Updated object "${updated.path}":`, updated.object);
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
                console.log("New DATA object:", DATA);
            }

            touch("./src/layout.pug", { nocreate: true });
        });
}

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

/** @param {string} text */
function markdown(text) {
    return md.render(text);
}

module.exports = {
    locals: {
        markdown,

        dev: !isProduction,
        currentYear: new Date().getFullYear(),

        /** @param {string} name */
        getMenuPath(name) {
            let path = SITE.menu[name];
            if (isProduction || path == "/") return path;
            return path + "index.pug";
        },

        menuEntry: null,
        css: null,
        js: null,

        icons: ICONS,
        site: SITE,
        data: DATA
    },
    filters: {
        markdown
    }
};
