<script lang="ts">
  import { JsonObject } from "@keupoz/tson";
  import parseGitUrl, { GitUrl } from "git-url-parse";
  import { createEventDispatcher, onMount } from "svelte";
  import { VariantEvents } from "./_types";

  export let json: JsonObject;
  export let currentVariantID: string;

  const name = json.getPrimitive("name").getAsString();
  const id = json.getPrimitive("id").getAsString();
  const branch = (() => {
    const branch = json.get("branch");

    if (branch === null) return null;

    return branch.getAsString();
  })();

  let selected = false;
  let repo: string | null = null;
  let gitUrl: GitUrl | null = null;
  let description: string | null = null;
  let image: string | null = null;

  const dispatch = createEventDispatcher<VariantEvents>();

  $: {
    selected = currentVariantID === id;
    dispatch("info", { id, repo, description, image });
  }

  $: {
    if (gitUrl === null) {
      repo = null;
    } else {
      repo = gitUrl.toString("https");

      if (branch !== null) {
        repo = `${repo}/tree/${branch}`;
      }
    }
  }

  function onClick(): void {
    dispatch("click", { id, repo, description, image });
  }

  onMount(async () => {
    const url = json.get("url");

    if (url !== null) {
      gitUrl = parseGitUrl(url.getAsString());

      const r = await fetch(
        `https://api.github.com/repos/${gitUrl.owner}/${gitUrl.name}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      const repoJson = await r.json();

      description = repoJson["description"];
      image = `https://raw.githubusercontent.com/${gitUrl.owner}/${
        gitUrl.name
      }/${branch ?? "HEAD"}/pack.png`;
    }

    if (selected) {
      dispatch("info", { id, repo, description, image });
    }
  });
</script>

<div class="variant" class:selected on:click={onClick}>{name}</div>

<style lang="scss">
  .variant {
    background: var(--primary-color);
    border-radius: var(--border-radius);
    color: white;
    display: block;
    padding: 0.125em 0.5em;
    opacity: 0.5;
    user-select: none;

    &.selected,
    &:hover {
      opacity: 1;
    }
  }
</style>
