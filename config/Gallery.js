const { join: joinPath } = require("path").posix;

const chokidar = require("chokidar");
const glob = require("glob");
const touch = require("touch");

/** @param {boolean} isProduction */
module.exports = (isProduction) => {
    const PATTERN = "assets/pages/gallery/screenshots/*";

    const FILES = glob.sync(PATTERN, { nodir: true })
        .map((value) => joinPath("~/", value));

    if (!isProduction) {
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
};
