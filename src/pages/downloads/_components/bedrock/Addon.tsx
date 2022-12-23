import { Component, createMemo, createResource, Suspense } from "solid-js";
import { fetchRepoInfo, getRawContentUrl, parseGitHubUrl } from "../utils/git";
import { BedrockAddon, BedrockAssets } from "./schemas";

export interface AddonProps {
  assets: BedrockAssets;
  addon: BedrockAddon;
}

export const Addon: Component<AddonProps> = ({ assets, addon }) => {
  const repo = createMemo(() => {
    return parseGitHubUrl(addon.url);
  });

  const image = createMemo(() => {
    const [owner, name] = repo();

    return getRawContentUrl(owner, name, "HEAD", "pack_icon.png");
  });

  const filename = createMemo(() => {
    return addon.filename.replace("{version}", assets.repos.base.version);
  });

  const url = createMemo(() => {
    return assets.templates.asset_url.replace("{tag}", assets.repos.base.tag).replace("{filename}", filename());
  });

  const [description] = createResource(async () => {
    const { description } = await fetchRepoInfo(...repo());
    return description;
  });

  return (
    <div class="card card--row">
      <div class="card__image">
        <img class="img--pixelated" src={image()} alt="Addon icon" />
      </div>

      <div class="card__body flex flex--xsmall">
        <h5 class="card__title">{addon.name}</h5>

        <div class="card__content">
          <Suspense fallback="Loading ...">{description() ?? "No description"}</Suspense> (<a href={addon.url}>GitHub</a>)
        </div>

        <a class="btn btn--primary" href={url()}>
          <span class="btn-label">Download</span>

          <span class="btn-icon btn-icon--right">
            <i class="fas fa-arrow-up-right-from-square" />
          </span>
        </a>
      </div>
    </div>
  );
};
