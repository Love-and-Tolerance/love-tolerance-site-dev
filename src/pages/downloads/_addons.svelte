<script lang="ts">
  import { createJsonElement, JsonElement } from "@keupoz/tson";
  import parseGitUrl from "git-url-parse";
  import { onMount } from "svelte";
  import Addon from "./_addon.svelte";
  import { AddonEvents } from "./_types";

  let defaultImage = "";
  let filenameTemplate = "";
  let mcVersion = "N/A";
  let packVersion = "N/A";
  let addonsList: Array<JsonElement> = [];
  let ids: string[] = [];

  const addonInstances: Array<Addon> = [];

  $: filename = filenameTemplate
    .replace("{version}", packVersion)
    .replace("{ids}", ids.join(""));

  const ASSETS_JSON =
    "https://raw.githubusercontent.com/VelvetRemedy/pack-release-builder/mane/assets.json";

  onMount(async () => {
    const r = await fetch(ASSETS_JSON);
    const json = createJsonElement(await r.json()).getAsObject();

    const repos = json.getObject("repos");
    const base = repos.getObject("base");
    const addons = repos.getArray("addons");

    const url = parseGitUrl(base.getPrimitive("url").getAsString());

    defaultImage = `https://raw.githubusercontent.com/${url.owner}/${url.name}/HEAD/pack.png`;

    filenameTemplate = base.getPrimitive("filename").getAsString();
    mcVersion = base.getPrimitive("mc_versions").getAsString();
    packVersion = base.getPrimitive("version").getAsString();

    filenameTemplate = `https://github.com/${url.owner}/${url.name}/releases/download/${packVersion}/${filenameTemplate}`;

    addonsList = Array.from(addons.iterator());
  });

  function onVariantSelect(event: CustomEvent<AddonEvents["variant"]>): void {
    ids[event.detail.pos] = event.detail.variant;
  }

  function reset(): void {
    for (const addon of addonInstances) {
      addon.reset();
    }
  }

  function resetDefaults(): void {
    for (const addon of addonInstances) {
      addon.resetDefault();
    }
  }
</script>

<h2>Custom downloads</h2>

<h3>Minecraft version: {mcVersion}</h3>

<div class="controls">
  <button class="control" on:click={reset}>Reset</button>
  <button class="control" on:click={resetDefaults}>Select defaults</button>
  <a class="control" href={filename}>Download</a>
</div>

<div class="addons">
  {#each addonsList as addon, index}
    <Addon
      {defaultImage}
      json={addon.getAsObject()}
      on:variant={onVariantSelect}
      bind:this={addonInstances[index]}
    />
  {/each}
</div>

<style lang="scss">
  .controls {
    display: flex;
    gap: 0.5em;
  }

  .control {
    background: var(--primary-color);
    border-radius: var(--border-radius);
    color: white;
    display: block;
    padding: 0.5em 1em;
    font: inherit;

    &:hover {
      text-decoration: none;
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(1px);
    }
  }

  .addons {
    --columns: 1;

    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    gap: var(--margin);
  }

  @media (min-width: 900px) {
    .addons {
      --columns: 2;
    }
  }
</style>
