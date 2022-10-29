<script lang="ts">
  import { onMount } from "svelte";
  import { fromZodError, ValidationError } from "zod-validation-error";
  import Addon from "./_addon.svelte";
  import { JavaAssetsAddon, JavaAssetsSchema } from "./_schemas";
  import { AddonEvents } from "./_types";
  import { parseGitHubUrl, rawContent } from "./_utils";

  let defaultImage = "";
  let filenameTemplate = "";
  let mcVersion = "N/A";
  let packVersion = "N/A";
  let addonsList: Array<JavaAssetsAddon> = [];
  let ids: string[] = [];

  let error: ValidationError | undefined;

  const addonInstances: Array<Addon> = [];

  $: filename = filenameTemplate
    .replace("{version}", packVersion)
    .replace("{ids}", ids.join(""));

  const ASSETS_JSON =
    "https://raw.githubusercontent.com/Love-and-Tolerance/pack-release-builder/mane/assets.json";

  onMount(async () => {
    const r = await fetch(ASSETS_JSON);
    const parseResult = JavaAssetsSchema.safeParse(await r.json());

    if (!parseResult.success) {
      error = fromZodError(parseResult.error);
      return;
    }

    const json = parseResult.data;
    const repo = parseGitHubUrl(json.repos.base.url);

    defaultImage = rawContent(repo, undefined, "pack.png");

    filenameTemplate = json.repos.base.filename;
    mcVersion = `${json.repos.base.mc_versions}`;
    packVersion = json.repos.base.version;

    filenameTemplate = `https://github.com/${repo.owner}/${repo.name}/releases/download/${packVersion}/${filenameTemplate}`;

    addonsList = json.repos.addons;
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

{#if error !== undefined}
  <div class="error">{error.message}</div>
{:else}
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
        json={addon}
        on:variant={onVariantSelect}
        bind:this={addonInstances[index]}
      />
    {/each}
  </div>
{/if}

<style lang="scss">
  .controls {
    display: flex;
    flex-wrap: wrap;
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
