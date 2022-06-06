<script lang="ts">
  import { JsonObject } from "@keupoz/tson";
  import { createEventDispatcher } from "svelte";
  import { AddonEvents, VariantEvents, VariantInfo } from "./_types";
  import Variant from "./_variant.svelte";

  export let defaultImage: string;
  export let json: JsonObject;

  const dispatch = createEventDispatcher<AddonEvents>();

  const defaultDescription = "No description";
  const defaultVariantID = json.getPrimitive("default").getAsString();
  const name = json.getPrimitive("name").getAsString();
  const pos = json.getPrimitive("id_pos").getAsInteger() - 1;

  const variants = Array.from(json.getArray("variants").iterator());

  let currentVariantID = defaultVariantID;
  let description = defaultDescription;
  let currentImage = defaultImage;
  let repo: string | null = null;

  function selectVariant(id: string): void {
    currentVariantID = id;
    dispatch("variant", { pos, variant: currentVariantID });
  }

  function updateInfo(info: VariantInfo): void {
    repo = info.repo;
    description = info.description ?? defaultDescription;
    currentImage = info.image ?? defaultImage;
  }

  function onVariantClick(event: CustomEvent<VariantEvents["click"]>): void {
    updateInfo(event.detail);
    selectVariant(event.detail.id);
  }

  function onVariantInfo(event: CustomEvent<VariantEvents["info"]>): void {
    if (currentVariantID === event.detail.id) {
      updateInfo(event.detail);
      selectVariant(event.detail.id);
    }
  }

  export function reset(): void {
    selectVariant("x");
  }

  export function resetDefault(): void {
    selectVariant(defaultVariantID);
  }
</script>

<div class="addon">
  <img
    class="addon__image"
    class:default={currentImage === defaultImage}
    src={currentImage}
    alt="Addon icon"
  />

  <div class="addon__content">
    <h5 class="addon__name">{name}</h5>

    <div class="addon__variants">
      {#each variants as variant}
        <Variant
          {currentVariantID}
          json={variant.getAsObject()}
          on:click={onVariantClick}
          on:info={onVariantInfo}
        />
      {/each}
    </div>

    <div class="addon__description">
      {description}
      {#if repo !== null}
        (<a href={repo}>GitHub</a>)
      {/if}
    </div>
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

      &.default {
        filter: grayscale(1);
        opacity: 0.75;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
    }

    &__variants {
      display: flex;
      gap: 0.5em;
    }
  }
</style>
