const MarkdownIt = require("markdown-it");

/** @param {string} text */
function slugify(text) {
    return encodeURIComponent(text.replace(/\s+/g, "-").replace(/(!|\?)/g, "").toLowerCase());
}

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
module.exports = function markdown(text, options = {}) {
    if (options.inline) return md.renderInline(text);
    return md.render(text);
};
