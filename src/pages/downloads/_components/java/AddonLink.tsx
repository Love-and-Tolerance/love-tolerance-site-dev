import { Component, createMemo, For, Match, Show, Switch } from "solid-js";
import { AddonLink as RawAddonLink } from "./schemas/assets";

export interface AddonLinkProps {
  data: RawAddonLink;
}

export const AddonLink: Component<AddonLinkProps> = (props) => {
  const icon = createMemo(() => {
    if (props.data.name.startsWith("CurseForge")) {
      return "icon icon-curseforge";
    } else if (props.data.name.startsWith("Modrinth")) {
      return "icon icon-modrinth";
    } else {
      return "fas fa-globe";
    }
  });

  return (
    <div class="hstack">
      <i class={icon()}></i>
      <Switch>
        <Match when={getLinkAsString(props.data.url)} keyed>
          {(url) => <a href={url}>{props.data.name}</a>}
        </Match>
        <Match when={getLinkAsArray(props.data.url)} keyed>
          {(items) => (
            <>
              <span>{props.data.name}:</span>

              <For each={items}>
                {(item, i) => (
                  <>
                    <a href={item.value}>{item.name}</a>
                    <Show when={i() + 1 < items.length}>
                      <span innerHTML="&bullet;" />
                    </Show>
                  </>
                )}
              </For>
            </>
          )}
        </Match>
      </Switch>
    </div>
  );
};

function getLinkAsString(link: RawAddonLink["url"]) {
  return typeof link === "string" ? link : null;
}

function getLinkAsArray(link: RawAddonLink["url"]) {
  return Array.isArray(link) ? link : null;
}
