const { join: joinPath } = require("path").posix;

const isProduction = !process.env.NODE_ENV_FPARCEL;
console.log(`Pug config environment is ${isProduction ? "production" : "development"}`);

const getIcon = require("./config/FontAwesome"),
    DATA = require("./config/Data")(isProduction),
    GALLERY = require("./config/Gallery")(isProduction);

const SITE = DATA.site;
SITE.menu = DATA.menu;

const markdown = require("./config/Markdown");

module.exports = {
    locals: {
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

        /** @param {string} text */
        markdown(text, options = { inline: true }) {
            return markdown(text, options);
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
