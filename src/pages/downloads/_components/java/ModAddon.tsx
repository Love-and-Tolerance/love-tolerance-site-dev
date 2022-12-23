import { Component, createMemo, createResource, For, Suspense } from "solid-js";
import { fetchRepoInfo, getRawContentUrl, parseGitHubUrl } from "../utils/git";
import { ExclusiveAddonVariant, ModAddonRaw } from "./schemas";

export interface ModAddonProps {
  addon: ModAddonRaw;
  selectedExclusives: ExclusiveAddonVariant[];
  selected: boolean;
  onSelect: (value: boolean) => void;
}

export const ModAddon: Component<ModAddonProps> = (props) => {
  const inputId = createMemo(() => {
    return `mod-addon-${props.addon.id}-checkbox`;
  });

  const repo = createMemo(() => {
    return parseGitHubUrl(props.addon.url);
  });

  const currentImage = createMemo(() => {
    const [owner, name] = repo();

    return getRawContentUrl(owner, name, "HEAD", "pack.png");
  });

  const [description] = createResource(repo, async (repo) => {
    const [owner, name] = repo;
    const info = await fetchRepoInfo(owner, name);

    return info.description ?? undefined;
  });

  return (
    <div class="card card--row-start">
      <div class="card__image">
        <img class="img--pixelated" src={currentImage()} alt="Addon icon" />
      </div>

      <div class="card__body flex flex--xsmall">
        <h5 class="card__title">{props.addon.name}</h5>

        <div class="flex flex--row flex--small flex--center">
          <input id={inputId()} type="checkbox" checked={props.selected} onChange={(e) => props.onSelect(e.currentTarget.checked)} />
          <label for={inputId()}>Enable addon</label>
        </div>

        <div class="card__content">
          <Suspense fallback="Loading ...">{description() ?? "No description"}</Suspense> (<a href={props.addon.url}>GitHub</a>)
        </div>

        <h6>Mod links:</h6>

        <ul>
          <For each={props.addon.links}>
            {(link) => (
              <li>
                <a href={link.url}>{link.name}</a>
              </li>
            )}
          </For>
        </ul>
      </div>
    </div>
  );
};
