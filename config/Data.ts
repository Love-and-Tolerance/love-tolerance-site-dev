import merge from "deepmerge";
import glob from "glob";
import { join, parse, sep } from "path";
import PluginError from "plugin-error";
import { obj } from "through2";
import touch from "touch";
import { isVinyl } from "vinyl";

const PLUGIN_NAME = "gulp-json-data";

export function data(touchPattern: string, getData: () => any, update: (data: any) => void) {
    return obj((file, encoding, callback) => {
        if (!isVinyl(file)) return callback(new PluginError(PLUGIN_NAME, "File is not vinyl"));

        if (file.isStream()) {
            return callback(new PluginError(PLUGIN_NAME, "Streaming is not supported"));
        }

        if (file.isBuffer()) {
            try {
                const contents = file.contents.toString(encoding),
                    value = JSON.parse(contents),
                    path = parse(file.relative),
                    json = {} as any;

                join(path.dir, path.name).split(sep).reduce((prev, curr, index, arr) => {
                    return prev[curr] = index === arr.length - 1 ? value : {};
                }, json);

                update(merge(getData(), json, {
                    arrayMerge(_, sourceArray) {
                        return sourceArray;
                    }
                }));

                glob.sync(touchPattern).forEach((path) => {
                    touch(path);
                });
            } catch (err) {
                return callback(new PluginError(PLUGIN_NAME, err));
            }
        }

        return callback(null, file);
    });
}
