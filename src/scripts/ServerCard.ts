import { wrapQuerySelector } from "@keupoz/strict-queryselector";
import { number, object, string } from "@mojotech/json-type-validation";
import Clipboard from "clipboard";
import { template } from "./utils";

const PING_URL = template`https://keupoztest.herokuapp.com/mcping?host=${"HOST"}`;

const PingResponseDecoder = object({
    players: object({
        max: number(),
        online: number()
    }),
    version: object({
        name: string()
    })
});

const PingErrorDecoder = object({
    code: string(),
    error: string()
});

new Clipboard(".intro .server .host", { target: trigger => trigger })
    .on("success", (e) => {
        e.trigger.classList.add("copied");
        setTimeout(() => {
            e.trigger.classList.remove("copied");
        }, 1500);
    });

export async function initServerCard($el: Element): Promise<void> {
    const qs = wrapQuerySelector($el),
        host = qs(".host", HTMLElement).innerText,
        $version = qs(".version", HTMLElement),
        $players = qs(".players", HTMLElement);

    function finalInit() {
        $el.classList.add("initialized");
    }

    const r = await fetch(PING_URL(host)),
        json = await r.json();

    if (r.status !== 200) {
        const { code, error } = PingErrorDecoder.runWithException(json);

        finalInit();
        $version.classList.add("error");

        if (code === "CONNECTION_REFUSED") {
            $version.innerText = "Offline";
        } else {
            $version.innerText = code;
        }

        console.error(`Error occurred while pinging ${host}: ${code} ${error}`);
    } else {
        const { players, version } = PingResponseDecoder.runWithException(json);

        finalInit();
        $version.innerText = version.name;
        $players.innerText = `${players.online}/${players.max}`;
    }
}
