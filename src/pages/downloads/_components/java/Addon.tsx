import { Component, createMemo, createResource, For, Show, Suspense } from "solid-js";
import { AddonInfo } from "./AddonInfo";

export interface AddonProps {
  info: AddonInfo;
  defaultImage: string;
  variantId: string;
  onVariantSelect: (id: string) => void;
}

export const Addon: Component<AddonProps> = (props) => {
  const currentVariant = createMemo(() => {
    return props.info.getVariant(props.variantId);
  });

  const currentImage = createMemo(() => {
    return currentVariant().image ?? props.defaultImage;
  });

  const [description] = createResource(currentVariant, (variant) => variant.getDescription());

  return (
    <div class="card card--row">
      <div class="card__image">
        <img class="img--pixelated" classList={{ "img--faded": currentImage() === props.defaultImage }} src={currentImage()} alt="Addon icon" />
      </div>

      <div class="card__body flex flex--xsmall">
        <h5 class="card__title">{props.info.name}</h5>

        <div class="flex flex--row flex--small">
          <For each={[...props.info.variants.values()]}>
            {(variant) => (
              <button
                class={`btn ${currentVariant() === variant ? "btn--primary" : "btn--light"}`}
                type="button"
                onClick={() => props.onVariantSelect(variant.id)}
              >
                {variant.name}
              </button>
            )}
          </For>
        </div>

        <div class="card__content">
          <Suspense fallback="Loading ...">{description() ?? "No description"}</Suspense>

          <Show when={currentVariant().repo} keyed>
            {(repo) => (
              <>
                {" "}
                (<a href={repo.getUrl()}>GitHub</a>)
              </>
            )}
          </Show>
        </div>
      </div>
    </div>
  );
};
