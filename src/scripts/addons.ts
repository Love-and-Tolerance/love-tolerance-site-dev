import { querySelector, wrapQuerySelector, wrapQuerySelectorAll } from "@keupoz/strict-queryselector";
import { AddonCard, getSelectedCount, unselectAll } from "./AddonCard";

const $panel = querySelector(".bundler-panel", HTMLElement),
    queryControl = wrapQuerySelector($panel),
    $count = queryControl(".count", HTMLElement),
    $unselectAll = queryControl(".unselect-all", HTMLElement);

const $cardsContainer = querySelector(".cards-container", HTMLElement),
    queryCardAll = wrapQuerySelectorAll($cardsContainer),
    $cards = queryCardAll(".card", HTMLElement);

// https://stackoverflow.com/a/13627586
function isSingular(n: number) {
    const j = n % 10,
        k = n % 100;

    return j == 1 && k == 11;
}

function updateCount() {
    const count = getSelectedCount();

    if (!count) {
        $count.innerText = "Click on add-on card to select";
        $unselectAll.classList.add("invisible");
    } else {
        $count.innerText = `Selected ${count} add-on${isSingular(count) ? "" : "s"}`;
        $unselectAll.classList.remove("invisible");
    }
}

$unselectAll.addEventListener("click", () => {
    unselectAll();
    updateCount();
});

$cards.forEach((el) => {
    const queryCardChild = wrapQuerySelector(el),
        { innerText: name, href: repo } = queryCardChild(".title a", HTMLAnchorElement);

    const self = new AddonCard({
        el, name, repo,
        selected: el.classList.contains("selected"),
        conflicts: el.getAttribute("data-conflicts") || false
    });

    el.addEventListener("click", function (e) {
        if (e.target instanceof HTMLAnchorElement) {
            self.getZip().then(console.log);
            return;
        }

        self.toggle();
        updateCount();
    });
});

updateCount();
$panel.classList.add("initialized");
