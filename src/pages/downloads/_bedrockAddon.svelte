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
  const downloadUrl = releaseUrl.replace("{filename}", filename.replace("{version}", version));

  let description = defaultDescription;
  let image = defaultImage;

  onMount(async () => {
    const repo = parseGitHubUrl(json.url);

    image = rawContent(repo, undefined, "pack_icon.png");

    const r = await fetch(`https://api.github.com/repos/${repo.owner}/${repo.name}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    const repoJson = await r.json();
    description = repoJson["description"];
  });
</script>

<div class="card card--row">
  <div class="card__image">
    <img class="img--pixelated" src={image} alt="Addon icon" />
  </div>

  <div class="card__body flex flex--xsmall">
    <h5 class="card__title">{name}</h5>

    <div class="card__content">
      {description}
      (<a href={url}>GitHub</a>)
    </div>

    <a class="btn btn--primary" href={downloadUrl}>
      <span class="btn-label">Download</span>

      <span class="btn-icon btn-icon--right">
        <i class="fas fa-arrow-up-right-from-square" />
      </span>
    </a>
  </div>
</div>
