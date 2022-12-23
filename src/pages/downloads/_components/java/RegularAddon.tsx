import { Component, createMemo, createResource, Show, Suspense } from "solid-js";
import { getBranch } from "../utils/branch";
import { fetchRepoInfo, getRawContentUrl, parseGitHubUrl } from "../utils/git";
import { ExclusiveAddonVariant, RegularAddonRaw } from "./schemas/assets";

export interface RegularAddonProps {
  addon: RegularAddonRaw;
  selectedExclusives: ExclusiveAddonVariant[];
  selected: boolean;
  onSelect: (value: boolean) => void;
}

export const RegularAddon: Component<RegularAddonProps> = (props) => {
  const inputId = createMemo(() => {
    return `regular-addon-${props.addon.id}-checkbox`;
  });

  const repo = createMemo(() => {
    return parseGitHubUrl(props.addon.url);
  });

  const currentImage = createMemo(() => {
    const [owner, name] = repo();
    const branch = getBranch(props.selectedExclusives, props.addon.branch);

    return getRawContentUrl(owner, name, branch, "pack.png");
  });

  const [description] = createResource(repo, async (repo) => {
    const [owner, name] = repo;
    const info = await fetchRepoInfo(owner, name);

    return info.description ?? undefined;
  });

  return (
    <div class="card card--row">
      <div class="card__image">
        <img class="img--pixelated" src={currentImage()} alt="Addon icon" />
      </div>

      <div class="card__body flex flex--xsmall">
        <h5 class="card__title">
          {props.addon.name}
          <Show when={props.addon.minimum_minecraft_version} keyed>
            {(v) => ` (${v}+)`}
          </Show>
        </h5>

        <div class="flex flex--row flex--small flex--center">
          <input id={inputId()} type="checkbox" checked={props.selected} onChange={(e) => props.onSelect(e.currentTarget.checked)} />
          <label for={inputId()}>Enable addon</label>
        </div>

        <div class="card__content">
          <Suspense fallback="Loading ...">{description() ?? "No description"}</Suspense> (<a href={props.addon.url}>GitHub</a>)
        </div>
      </div>
    </div>
  );
};
