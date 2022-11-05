<script lang="ts">
  import { onMount } from "svelte";
  import { fromZodError, ValidationError } from "zod-validation-error";
  import Addon from "./_bedrockAddon.svelte";
  import { BedrockAssetsAddon, BedrockAssetsSchema } from "./_schemas";
  import { parseGitHubUrl, rawContent } from "./_utils";

  let defaultImage = "";
  let releaseUrl = "";
  let mcVersion = "N/A";
  let packVersion = "N/A";
  let addonsList: Array<BedrockAssetsAddon> = [];

  let error: ValidationError | undefined;

  const ASSETS_JSON =
    "https://raw.githubusercontent.com/Love-and-Tolerance/pack-release-builder/mane/assets/bedrock.json";

  onMount(async () => {
    const r = await fetch(ASSETS_JSON);
    const parseResult = BedrockAssetsSchema.safeParse(await r.json());

    if (!parseResult.success) {
      error = fromZodError(parseResult.error);
      return;
    }

    const repos = parseResult.data.repos;
    const base = repos.base;

    const repo = parseGitHubUrl(base.url);
    defaultImage = rawContent(repo, undefined, "pack_icon.png");

    mcVersion = base.mc_versions;
    packVersion = base.version;
    releaseUrl = base.release_url.replace("{tag}", base.tag);

    addonsList = [
      { name: "Base resourcepack", filename: base.filename, url: base.url },
      ...repos.addons,
    ];
  });
</script>

<h2>Bedrock downloads</h2>

{#if error !== undefined}
  <div class="error">{error.message}</div>
{:else}
  <h3>Minecraft version: {mcVersion}</h3>

  <div class="grid grid--col-2">
    {#each addonsList as addon}
      <Addon {defaultImage} {releaseUrl} version={packVersion} json={addon} />
    {/each}
  </div>
{/if}
