<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { JavaAssetsAddonVariant } from "./_schemas";
  import { VariantEvents } from "./_types";
  import { GitHubRepo, parseGitHubUrl, rawContent, stringifyGitHubUrl } from "./_utils";

  export let json: JavaAssetsAddonVariant;
  export let currentVariantID: string;

  const { name, id, branch } = json;

  let selected = false;
  let url: string | undefined = undefined;
  let repo: GitHubRepo | undefined = undefined;
  let description = json.description;
  let image = json["pack.png"];

  const dispatch = createEventDispatcher<VariantEvents>();

  $: {
    selected = currentVariantID === id;
    dispatch("info", { id, url, description, image });
  }

  function onClick(): void {
    dispatch("click", { id, url, description, image });
  }

  onMount(async () => {
    if (json.url !== undefined) {
      repo = parseGitHubUrl(json.url);
      url = stringifyGitHubUrl(repo, "tree", branch);

      if (image === undefined) {
        image = rawContent(repo, branch, "pack.png");
      }

      if (description === undefined) {
        const r = await fetch(`https://api.github.com/repos/${repo.owner}/${repo.name}`, {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        });

        const repoJson = await r.json();
        description = repoJson["description"];
      }
    }

    if (selected) {
      dispatch("info", { id, url, description, image });
    }
  });
</script>

<button class={`btn ${selected ? "btn--primary" : "btn--light"}`} type="button" on:click={onClick}>
  {name}
</button>
