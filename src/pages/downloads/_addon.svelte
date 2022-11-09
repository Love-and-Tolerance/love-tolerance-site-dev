<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { JavaAssetsAddon } from "./_schemas";
  import { AddonEvents, VariantEvents, VariantInfo } from "./_types";
  import Variant from "./_variant.svelte";

  export let defaultImage: string;
  export let json: JavaAssetsAddon;

  const dispatch = createEventDispatcher<AddonEvents>();

  const { name, variants } = json;

  const defaultDescription = "No description";
  const defaultVariantID = json.default;
  const pos = json.id_pos - 1;

  let currentVariantID = defaultVariantID;
  let description = defaultDescription;
  let currentImage = defaultImage;
  let url: string | undefined = undefined;

  function selectVariant(id: string): void {
    currentVariantID = id;
    dispatch("variant", { pos, variant: currentVariantID });
  }

  function updateInfo(info: VariantInfo): void {
    url = info.url;
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

<div class="card card--row">
  <div class="card__image">
    <img class="img--pixelated" class:img--faded={currentImage === defaultImage} src={currentImage} alt="Addon icon" />
  </div>

  <div class="card__body flex flex--xsmall">
    <h5 class="card__title">{name}</h5>

    <div class="flex flex--row flex--small">
      {#each variants as variant}
        <Variant {currentVariantID} json={variant} on:click={onVariantClick} on:info={onVariantInfo} />
      {/each}
    </div>

    <div class="card__content">
      {description}
      {#if url !== undefined}
        (<a href={url}>GitHub</a>)
      {/if}
    </div>
  </div>
</div>
