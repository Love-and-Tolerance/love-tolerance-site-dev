import { Component, createMemo, createResource, For, Show, Suspense } from "solid-js";
import { getBranch } from "../utils/branch";
import { fetchRepoInfo, getRawContentUrl, parseGitHubUrl } from "../utils/git";
import { ExclusiveAddonRaw, ExclusiveAddonVariant } from "./schemas/assets";

export interface ExclusiveAddonProps {
  addon: ExclusiveAddonRaw;
  defaultImage: string;
  variantId: string;
  selectedExclusives: ExclusiveAddonVariant[];
  onVariantSelect: (variant: ExclusiveAddonVariant) => void;
}

export const ExclusiveAddon: Component<ExclusiveAddonProps> = (props) => {
  const currentVariant = createMemo(() => {
    const variant = props.addon.variants.find((variant) => {
      return variant.id === props.variantId;
    });

    if (variant === undefined) {
      throw new Error(`No variant with id '${props.variantId}'`);
    }

    return variant;
  });

  const currentRepo = createMemo(() => {
    const variant = currentVariant();

    if (variant.url === undefined) return undefined;

    return parseGitHubUrl(variant.url);
  });

  const currentImage = createMemo(() => {
    const variant = currentVariant();

    if (variant.image !== undefined) {
      return variant.image;
    }

    const repo = currentRepo();

    if (repo === undefined) return props.defaultImage;

    const [owner, name] = repo;
    const branch = getBranch(props.selectedExclusives, variant.branch);

    return getRawContentUrl(owner, name, branch, "pack.png");
  });

  const [description] = createResource(currentVariant, async (variant) => {
    if (variant.description !== undefined) {
      return variant.description;
    }

    const repo = currentRepo();

    if (repo === undefined) return undefined;

    const [owner, name] = repo;
    const info = await fetchRepoInfo(owner, name);

    return info.description ?? undefined;
  });

  return (
    <div class="card card--row">
      <div class="card__image">
        <img class="img--pixelated" classList={{ "img--faded": currentImage() === props.defaultImage }} src={currentImage()} alt="Addon icon" />
      </div>

      <div class="card__body flex flex--xsmall">
        <h5 class="card__title">{props.addon.name}</h5>

        <div class="flex flex--row flex--small">
          <For each={props.addon.variants}>
            {(variant) => (
              <button
                class={`btn ${currentVariant() === variant ? "btn--primary" : "btn--light"}`}
                type="button"
                onClick={() => props.onVariantSelect(variant)}
              >
                {variant.name}
              </button>
            )}
          </For>
        </div>

        <div class="card__content">
          <Suspense fallback="Loading ...">{description() ?? "No description"}</Suspense>

          <Show when={currentVariant().url} keyed>
            {(url) => (
              <>
                {" "}
                (<a href={url}>GitHub</a>)
              </>
            )}
          </Show>
        </div>
      </div>
    </div>
  );
};
