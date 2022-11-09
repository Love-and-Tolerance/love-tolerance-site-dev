import { Component, createResource, Suspense } from "solid-js";
import { GitHubRepo } from "../GitHubRepo";
import { RawBaseRepo } from "../schemas";
import { RawAddon } from "./schemas";

export interface AddonProps {
  raw: RawAddon;
  base: RawBaseRepo;
}

export const Addon: Component<AddonProps> = (props) => {
  const repo = GitHubRepo.fromUrl(props.raw.url);
  const image = repo.rawContentUrl("pack_icon.png");

  const filename = props.raw.filename.replace("{version}", props.base.version);
  const url = props.base.release_url.replace("{tag}", props.base.tag).replace("{filename}", filename);

  const [description] = createResource(async () => {
    const info = await repo.fetchInfo();
    return info.description;
  });

  return (
    <div class="card card--row">
      <div class="card__image">
        <img class="img--pixelated" src={image} alt="Addon icon" />
      </div>

      <div class="card__body flex flex--xsmall">
        <h5 class="card__title">{props.raw.name}</h5>

        <div class="card__content">
          <Suspense fallback="Loading ...">{description() ?? "No description"}</Suspense> (<a href={repo.getUrl()}>GitHub</a>)
        </div>

        <a class="btn btn--primary" href={url}>
          <span class="btn-label">Download</span>

          <span class="btn-icon btn-icon--right">
            <i class="fas fa-arrow-up-right-from-square" />
          </span>
        </a>
      </div>
    </div>
  );
};
