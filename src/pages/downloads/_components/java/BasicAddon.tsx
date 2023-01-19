import { Component, createMemo, createResource, For, Show, Suspense } from "solid-js";
import { getBranch } from "../utils/branch";
import { fetchRepoInfo, getRawContentUrl, parseGitHubUrl } from "../utils/git";
import { AddonLink } from "./AddonLink";
import { BasicAddonRaw } from "./schemas/assets";

export interface BasicAddonProps {
  triggers: string[];
  data: BasicAddonRaw;
  active: boolean;
  onToggle: (value: boolean) => void;
}

export const BasicAddon: Component<BasicAddonProps> = (props) => {
  const repo = createMemo(() => {
    return parseGitHubUrl(props.data.url);
  });

  const branch = createMemo(() => {
    return getBranch(props.triggers, props.data.branch);
  });

  const image = createMemo(() => {
    const [owner, name] = repo();

    return getRawContentUrl(owner, name, branch(), "pack.png");
  });

  const [description] = createResource(repo, async ([owner, name]) => {
    const { description } = await fetchRepoInfo(owner, name);

    return description;
  });

  const toggleButton = createMemo<[className: string, label: string, icon: string]>(() => {
    if (props.active) {
      return ["btn--primary", "Disable", "fa-xmark"];
    } else {
      return ["btn--light", "Enable", "fa-check"];
    }
  });

  return (
    <div class="hcard" classList={{ "hcard-active": props.active }}>
      <div class="hcard-body">
        <div class="hcard-image">
          <img src={image()} alt={`"${props.data.name}" add-on image`} />
        </div>

        <div class="hcard-content">
          <div class="hcard-title">
            <div class="hcard-title__left">
              <h5>{props.data.name}</h5>

              <Show when={props.data.recommended}>
                <i class="text-muted fas fa-star" title="Recommended" />
              </Show>

              <a href={props.data.url} class="icon-link" title={`"${props.data.name}" add-on GitHub repo`}>
                <i class="fab fa-github" />
              </a>
            </div>

            <div class="hcard-title__right">
              <Show when={props.data.info} keyed>
                {(info) => <div class="text-muted">{info.join(", ")}</div>}
              </Show>

              <button class={`btn ${toggleButton()[0]}`} onClick={() => props.onToggle(!props.active)}>
                <span>{toggleButton()[1]}</span>
                <i class={`fa ${toggleButton()[2]}`} />
              </button>
            </div>
          </div>

          <p>
            <Suspense fallback="Loading ...">{description() ?? "No description"}</Suspense>
          </p>
        </div>
      </div>

      <Show when={props.data.links} keyed>
        {(links) => (
          <div class="hcard-footer">
            <For each={links}>{(link) => <AddonLink data={link} />}</For>
          </div>
        )}
      </Show>
    </div>
  );
};
