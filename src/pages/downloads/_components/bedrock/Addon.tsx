import { Component, createMemo, createResource, Suspense } from "solid-js";
import { fetchRepoInfo, getRawContentUrl, parseGitHubUrl } from "../utils/git";
import { BedrockAddon, BedrockAssets } from "./schemas";

export interface AddonProps {
  assets: BedrockAssets;
  data: BedrockAddon;
}

export const Addon: Component<AddonProps> = (props) => {
  const repo = createMemo(() => {
    return parseGitHubUrl(props.data.url);
  });

  const image = createMemo(() => {
    const [owner, name] = repo();

    return getRawContentUrl(owner, name, "HEAD", "pack_icon.png");
  });

  const filename = createMemo(() => {
    return props.data.filename.replace("{version}", props.assets.repos.base.version);
  });

  const url = createMemo(() => {
    return props.assets.templates.asset_url.replace("{tag}", props.assets.repos.base.tag).replace("{filename}", filename());
  });

  const [description] = createResource(repo, async (repo) => {
    const { description } = await fetchRepoInfo(...repo);
    return description;
  });

  return (
    <div class="hcard">
      <div class="hcard-body">
        <div class="hcard-image">
          <img src={image()} alt={`"${props.data.name}" add-on image`} />
        </div>

        <div class="hcard-content">
          <div class="hcard-title">
            <div class="hcard-title__left">
              <h5>{props.data.name}</h5>

              <a href={props.data.url} class="icon-link">
                <i class="fab fa-github" />
              </a>
            </div>

            <div class="hcard-title__right">
              <a href={url()} class="btn btn--primary">
                <span>Download</span>
                <i class="fas fa-arrow-up-right-from-square" />
              </a>
            </div>
          </div>

          <p>
            <Suspense fallback="Loading ...">{description() ?? "No description"}</Suspense>
          </p>
        </div>
      </div>
    </div>
  );
};
