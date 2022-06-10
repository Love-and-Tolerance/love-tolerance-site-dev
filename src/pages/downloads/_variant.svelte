<script lang="ts">
  import { JsonObject } from "@keupoz/tson";
  import { createEventDispatcher, onMount } from "svelte";
  import { VariantEvents } from "./_types";
  import {
    GitHubRepo,
    parseGitHubUrl,
    rawContent,
    stringifyGitHubUrl,
  } from "./_utils";

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
  let url: string | null = null;
  let repo: GitHubRepo | null = null;
  let description: string | null = null;
  let image: string | null = null;

  const dispatch = createEventDispatcher<VariantEvents>();

  $: {
    selected = currentVariantID === id;
    dispatch("info", { id, url, description, image });
  }

  function onClick(): void {
    dispatch("click", { id, url, description, image });
  }

  onMount(async () => {
    const rawUrl = json.get("url");

    if (rawUrl !== null) {
      repo = parseGitHubUrl(rawUrl.getAsString());

      const r = await fetch(
        `https://api.github.com/repos/${repo.owner}/${repo.name}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      url = stringifyGitHubUrl(repo, "tree", branch);
      image = rawContent(repo, branch, "pack.png");

      const repoJson = await r.json();
      description = repoJson["description"];
    }

    if (selected) {
      dispatch("info", { id, url, description, image });
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
