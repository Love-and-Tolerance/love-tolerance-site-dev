import { dict, object, string } from "@mojotech/json-type-validation";
import { readFileSync } from "fs";
import { parse as parseYaml } from "yaml";

export function initIcons() {
    const iconsPath = require.resolve("@fortawesome/fontawesome-free/metadata/icons.yml");
    const iconsRaw = readFileSync(iconsPath, { encoding: "utf-8" });
    const iconsParsed = parseYaml(iconsRaw);

    const ICONS = dict(object({
        unicode: string()
    })).runWithException(iconsParsed);

    /**
     * Find FontAwesome free icon by name. Search for icons here: https://fontawesome.com/icons?d=gallery&m=free
     * @param name FontAwesome Free icon name
     * @returns Found icon or placeholder code
     */
    function icon(name: string) {
        const icon = ICONS[name] || ICONS["exclamation-circle"];

        return `&#x${icon.unicode};`;
    }

    return icon;
}
