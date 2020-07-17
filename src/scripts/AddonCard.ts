import { template } from "./utils";

const GITHUB_ZIP = template`https://api.github.com/repos/${"OWNER"}/${"REPO"}/${"ARCHIVE_FORMAT"}/${"REF"}`,
    CARDS = new Map<string, AddonCard>();

export function getSelectedCount() {
    let count = 0;

    for (const card of CARDS.values()) {
        if (card.isSelected()) count++;
    }

    return count;
}

export function unselectAll() {
    for (const card of CARDS.values()) {
        card.toggle(false);
    }
}

interface CardInfo {
    el: HTMLElement;
    selected: boolean;
    conflicts: string | false;
    name: string;
    repo: string;
}

export class AddonCard {
    private selected: boolean;
    private readonly conflicts: string | false;
    private readonly zipUrl: string;
    private zipBlob: Blob | null = null;

    readonly el: HTMLElement;
    readonly name: string;

    constructor(info: CardInfo) {
        this.el = info.el;
        this.selected = info.selected;
        this.conflicts = info.conflicts;
        this.name = info.name;

        const [owner, repo] = info.repo.replace(/^https:\/\/github.com\//, "").split("/");

        this.zipUrl = GITHUB_ZIP(owner, repo, "zipball", "master");
        console.log(this.zipUrl);

        CARDS.set(this.name, this);
    }

    isSelected() {
        return this.selected;
    }

    toggle(select = !this.selected) {
        const conflict = this.getConflict();

        if (conflict) {
            if (conflict.isSelected()) {
                select = false;
            } else {
                conflict.toggleConflictClass(select);
            }
        }

        if (select) this.el.classList.add("selected");
        else this.el.classList.remove("selected");

        this.selected = select;
    }

    getConflict() {
        if (!this.conflicts) return null;

        return CARDS.get(this.conflicts) || null;
    }

    toggleConflictClass(value = true) {
        if (value) this.el.classList.add("conflicts");
        else this.el.classList.remove("conflicts");
    }

    async getZip() {
        if (this.zipBlob) return this.zipBlob;

        const r = await fetch(this.zipUrl);

        if (r.status !== 200) return null;

        const blob = await r.blob();

        this.zipBlob = blob;
        return blob;
    }
}
