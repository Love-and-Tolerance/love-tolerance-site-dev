import "./Server.scss";

import { copy } from "clipboard";
import { Component, createSignal, onCleanup, onMount } from "solid-js";
import { PingResult, PingResultSchema } from "./ServerSchemas";

export interface ServerProps {
  name: string;
  hostname: string;
  mcVersion: string;
}

async function ping(hostname: string): Promise<PingResult> {
  const r = await fetch(`https://api.mcsrvstat.us/2/${hostname}`);
  const json = await r.json();

  return PingResultSchema.parse(json);
}

export const Server: Component<ServerProps> = (props) => {
  const [mcVersion, setMcVersion] = createSignal(props.mcVersion);
  const [online, setOnline] = createSignal("");
  const [copyStatus, setCopyStatus] = createSignal("none");

  let lastTimeout: number | null = null;

  function runCopy(): void {
    const result = copy(props.hostname);

    setCopyStatus(result === "" ? "error" : "success");

    lastTimeout = setTimeout(
      () => {
        setCopyStatus("ready");
        lastTimeout = null;
      },
      1500,
      null
    );
  }

  onMount(async () => {
    setCopyStatus("ready");

    const pingResult = await ping(props.hostname);

    if (pingResult.online) {
      setMcVersion(`Java ${pingResult.version}`);
      setOnline(`${pingResult.players.online}/${pingResult.players.max}`);
    } else {
      setOnline("Offline");
    }
  });

  onCleanup(() => {
    if (lastTimeout !== null) {
      clearTimeout(lastTimeout);
    }
  });

  return (
    <div class="mc-server">
      <div class="mc-server__info">
        <div class="mc-server__name">{props.name}</div>
        <div class="mc-server__version">{mcVersion()}</div>
        <div class="mc-server__online">{online()}</div>
      </div>

      <button class="mc-server__hostname" data-copy={copyStatus()} onClick={runCopy}>
        {props.hostname}
      </button>
    </div>
  );
};
