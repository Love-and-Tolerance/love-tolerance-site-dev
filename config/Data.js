const { readFileSync } = require("fs");
const { join: joinPath, parse: parsePath } = require("path").posix;

const chokidar = require("chokidar");
const glob = require("glob");
const touch = require("touch");

/** @param {boolean} isProduction */
module.exports = (isProduction) => {
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

    if (!isProduction) {
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
};
