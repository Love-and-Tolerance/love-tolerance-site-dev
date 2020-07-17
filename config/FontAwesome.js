const { readFileSync } = require("fs");
const { dict, object, string } = require("@mojotech/json-type-validation");
const { parse: parseYaml } = require("yaml");

/**
 * Find FontAwesome free icon by name. Search for icons here: https://fontawesome.com/icons?d=gallery&m=free
 * @param {string} name FontAwesome Free icon name
 * @returns Found icon or placeholder code
 */
module.exports = (() => {
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
