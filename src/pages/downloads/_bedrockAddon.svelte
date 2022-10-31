<script lang="ts">
  import { onMount } from "svelte";
  import { BedrockAssetsAddon } from "./_schemas";
  import { parseGitHubUrl, rawContent } from "./_utils";

  export let version: string;
  export let defaultImage: string;
  export let releaseUrl: string;
  export let json: BedrockAssetsAddon;

  const { name, filename, url } = json;

  const defaultDescription = "No description";
  const downloadUrl = releaseUrl.replace(
    "{filename}",
    filename.replace("{version}", version)
  );

  let description = defaultDescription;
  let image = defaultImage;

  onMount(async () => {
    const repo = parseGitHubUrl(json.url);

    image = rawContent(repo, undefined, "pack_icon.png");

    const r = await fetch(
      `https://api.github.com/repos/${repo.owner}/${repo.name}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    const repoJson = await r.json();
    description = repoJson["description"];
  });
</script>

<div class="addon">
  <img class="addon__image" src={image} alt="Addon icon" />

  <div class="addon__content">
    <h5 class="addon__name">{name}</h5>

    <div class="addon__description">
      {description}
      (<a href={url}>GitHub</a>)
    </div>

    <a href={downloadUrl} class="addon__download">Download</a>
  </div>
</div>

<style lang="scss">
  .addon {
    border-radius: var(--border-radius);
    box-shadow: var(--drop-shadow);
    padding: 1em;

    display: flex;
    gap: 1em;

    &__image {
      image-rendering: pixelated;
      object-fit: cover;

      width: 6.125em;
      height: 6.125em;
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
    }

    &__download {
      background: var(--primary-color);
      border-radius: var(--border-radius);
      color: white;
      display: block;
      padding: 0.125em 0.5em;
      user-select: none;

      align-self: start;

      &:hover {
        opacity: 0.8;
      }
    }
  }
</style>
