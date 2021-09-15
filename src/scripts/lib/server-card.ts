import Clipboard from "clipboard";

const pingUrl = (hostname: string) => `https://api.mcsrvstat.us/2/${hostname}`;

const $serverHosts = document.querySelectorAll(".intro .server .host");

function createCopyHandler(className: string) {
    return (e: Clipboard.Event) => {
        e.trigger.classList.add(className);

        setTimeout(() => {
            e.trigger.classList.remove(className);
        }, 1500);
    };
}

new Clipboard($serverHosts, { target: (trigger) => trigger })
    .on("success", createCopyHandler("success"))
    .on("error", createCopyHandler("error"));

$serverHosts.forEach((el) => {
    el.classList.add("clipboard-ready");
});

export async function initServerCard(el: Element | null) {
    if (!(el instanceof HTMLElement)) {
        throw new Error("Not html element");
    }

    const $hostname = el.querySelector(".host"),
        $version = el.querySelector(".version"),
        $online = el.querySelector(".players");

    if (!($hostname instanceof HTMLElement)) {
        throw new Error("No hostname html element");
    }

    const hostname = $hostname.innerText,
        r = await fetch(pingUrl(hostname)),
        json = await r.json();

    function setInformation(version: string, online: string) {
        if ($version instanceof HTMLElement) {
            $version.innerText = version;
        }

        if ($online instanceof HTMLElement) {
            $online.innerText = online;
        }

        if (el !== null) {
            el.classList.add("initialized");
        }
    }

    if (json.online === false) {
        setInformation("", "Offline");

        return;
    }

    setInformation(`Java ${json.version}`, `${json.players.online}/${json.players.max}`);
}
