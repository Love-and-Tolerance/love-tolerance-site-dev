import MarkdownIt from "markdown-it";

function slugify(text: string) {
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

export interface Options {
    inline?: boolean;
}

export function markdown(text: string, options: Options = { inline: true }) {
    if (options.inline) return md.renderInline(text);
    return md.render(text);
}
