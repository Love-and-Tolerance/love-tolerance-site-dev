<script lang="ts">
  import { onMount } from "svelte";
  import { fromZodError, ValidationError } from "zod-validation-error";
  import Addon from "./_addon.svelte";
  import { JavaAssetsAddon, JavaAssetsSchema } from "./_schemas";
  import { AddonEvents } from "./_types";
  import { parseGitHubUrl, rawContent } from "./_utils";

  let defaultImage = "";
  let releaseUrl = "";
  let mcVersion = "N/A";
  let packVersion = "N/A";
  let addonsList: Array<JavaAssetsAddon> = [];
  let ids: string[] = [];

  let error: ValidationError | undefined;

  const addonInstances: Array<Addon> = [];

  $: filename = releaseUrl.replace("{version}", packVersion).replace("{ids}", ids.join(""));

  const ASSETS_JSON = "https://raw.githubusercontent.com/Love-and-Tolerance/pack-release-builder/mane/assets/java.json";

  onMount(async () => {
    const r = await fetch(ASSETS_JSON);
    const parseResult = JavaAssetsSchema.safeParse(await r.json());

    if (!parseResult.success) {
      error = fromZodError(parseResult.error);
      return;
    }

    const repos = parseResult.data.repos;
    const base = repos.base;

    const repo = parseGitHubUrl(repos.base.url);
    defaultImage = rawContent(repo, undefined, "pack.png");

    mcVersion = base.mc_versions;
    packVersion = base.version;

    releaseUrl = base.release_url.replace("{tag}", base.tag).replace("{filename}", base.filename);

    addonsList = repos.addons;
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

<h2>Custom Java downloads</h2>

{#if error !== undefined}
  <div class="error">{error.message}</div>
{:else}
  <h3>Minecraft version: {mcVersion}</h3>

  <div class="flex flex--row flex--small">
    <button class="btn btn--primary btn--medium" type="button" on:click={reset}> Reset </button>

    <button class="btn btn--primary btn--medium" type="button" on:click={resetDefaults}> Select defaults </button>

    <a class="btn btn--primary btn--medium" href={filename}>
      <span class="btn-label">Download</span>

      <span class="btn-icon btn-icon--right">
        <i class="fas fa-arrow-up-right-from-square" />
      </span>
    </a>
  </div>

  <div class="grid grid--col-2">
    {#each addonsList as addon, index}
      <Addon {defaultImage} json={addon} on:variant={onVariantSelect} bind:this={addonInstances[index]} />
    {/each}
  </div>
{/if}
