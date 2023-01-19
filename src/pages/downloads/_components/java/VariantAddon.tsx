import classnames from "classnames";
import { Component, createMemo, createResource, For, Show, Suspense } from "solid-js";
import { getBranch } from "../utils/branch";
import { fetchRepoInfo, getRawContentUrl, parseGitHubUrl, RepoTuple } from "../utils/git";
import { VariantAddonRaw, VariantRaw } from "./schemas/assets";

export interface VariantAddonProps {
  defaultImage: string;
  triggers: string[];
  data: VariantAddonRaw;
  selectedVariant: string;
  onVariant: (id: string) => void;
}

export const VariantAddon: Component<VariantAddonProps> = (props) => {
  const currentVariant = createMemo(() => {
    return props.data.variants.find((variant) => variant.id === props.selectedVariant) ?? null;
  });

  const repo = createMemo(() => {
    const url = currentVariant()?.url;

    return url === undefined ? null : parseGitHubUrl(url);
  });

  const branch = createMemo(() => {
    return getBranch(props.triggers, currentVariant()?.branch);
  });

  const image = createMemo(() => {
    const variantImage = currentVariant()?.image;

    if (variantImage !== undefined) return variantImage;

    const variantRepo = repo();

    if (variantRepo !== null) {
      return getRawContentUrl(...variantRepo, branch(), "pack.png");
    }

    return null;
  });

  const currentInfo = createMemo<[variant: VariantRaw | null, repo: RepoTuple | null]>(() => {
    return [currentVariant(), repo()];
  });

  const [description] = createResource(currentInfo, async ([variant, repo]) => {
    if (variant?.description !== undefined) {
      return variant.description;
    }

    if (repo !== null) {
      const info = await fetchRepoInfo(...repo);
      return info.description;
    }

    return null;
  });

  return (
    <div class="hcard">
      <div class="hcard-body">
        <div
          class="hcard-image"
          classList={{
            "hcard-image--muted": image() === null,
          }}
        >
          <img src={image() ?? props.defaultImage} alt={`"${currentVariant()?.name}" variant image`} />
        </div>

        <div class="hcard-content">
          <div class="hcard-title">
            <h5>{props.data.name}</h5>
            <Show when={currentVariant()?.url} keyed>
              {(url) => (
                <a href={url} class="icon-link" title={`"${currentVariant()?.name}" variant GitHub repo`}>
                  <i class="fab fa-github" />
                </a>
              )}
            </Show>
          </div>

          <div class="hcard-actions">
            <For each={props.data.variants}>
              {(variant) => (
                <button
                  class={classnames("btn", props.selectedVariant === variant.id ? "btn--primary" : "btn--light")}
                  onClick={props.onVariant.bind(null, variant.id)}
                >
                  <span>{variant.name}</span>

                  <Show when={variant.id === props.data.default_variant}>
                    <i class="fas fa-star" title="Recommended" />
                  </Show>
                </button>
              )}
            </For>
          </div>

          <p>
            <Suspense fallback="Loading ...">{description() ?? "No description"}</Suspense>
          </p>
        </div>
      </div>
    </div>
  );
};
