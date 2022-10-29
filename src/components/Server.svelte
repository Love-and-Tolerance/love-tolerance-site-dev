<script lang="ts">
  import { copy } from "clipboard";
  import { onMount } from "svelte";
  import { PingResultSchema } from "./ServerSchemas";

  interface ServerInfo {
    name: string;
    hostname: string;
    mcVersion: string;
  }

  export let server: ServerInfo;

  let online = "";
  let copyStatus = "none";

  const pingUrl = `https://api.mcsrvstat.us/2/${server.hostname}`;

  async function ping(): Promise<void> {
    const r = await fetch(pingUrl);
    const json = PingResultSchema.parse(await r.json());

    if (json.online) {
      server.mcVersion = `Java ${json.version}`;
      online = `${json.players.online}/${json.players.max}`;
    } else {
      online = "Offline";
    }
  }

  function doCopy(
    e: MouseEvent & { currentTarget: EventTarget & HTMLElement }
  ): void {
    const result = copy(e.currentTarget);

    if (result === "") {
      copyStatus = "error";
    } else {
      copyStatus = "success";
    }

    setTimeout(() => {
      copyStatus = "ready";
    }, 1500);
  }

  onMount(() => {
    copyStatus = "ready";
    ping();
  });
</script>

<div class="mc-server">
  <div class="mc-server__info">
    <div class="mc-server__name">{server.name}</div>
    <div class="mc-server__version">{server.mcVersion}</div>
    <div class="mc-server__online">{online}</div>
  </div>

  <div class="mc-server__hostname" data-copy={copyStatus} on:click={doCopy}>
    {server.hostname}
  </div>
</div>

<style lang="scss">
  .mc-server {
    -webkit-backdrop-filter: blur(16px);
    backdrop-filter: blur(16px);
    background: rgba(white, 0.125);
    border-radius: var(--border-radius);
    padding: calc(var(--margin) / 2);
    white-space: nowrap;

    &__info {
      display: flex;
      gap: 0.5em;
    }

    &__name {
      font-weight: bold;

      flex-grow: 1;
    }

    &__version {
      opacity: 0.75;
    }

    &__online:empty {
      display: none;
    }

    &__hostname {
      font-family: monospace;
      font-size: 1.5em;
      text-align: center;

      position: relative;

      &::after {
        background: rgba(black, 0.75);
        border-radius: 5px;
        font-size: 0.9rem;
        padding: 5px;
        transform: translate(-50%, -5px);

        position: absolute;
        bottom: 100%;
        left: 50%;
      }

      &:global([data-copy="ready"]:hover::after) {
        content: "Click to copy";
      }

      &:global([data-copy="success"]::after) {
        content: "Copied!";
      }

      &:global([data-copy="error"]::after) {
        content: "Error occured";
      }
    }
  }
</style>
