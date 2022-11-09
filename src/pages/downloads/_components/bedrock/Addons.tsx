import { Component, createResource, ErrorBoundary, For, Show } from "solid-js";
import { RawBaseRepo } from "../schemas";
import { handleError } from "../utils";
import { Addon } from "./Addon";
import { AssetsSchema, RawAddon, RawAssets } from "./schemas";

const ASSETS_JSON = "https://raw.githubusercontent.com/Love-and-Tolerance/pack-release-builder/mane/assets/bedrock.json";

async function fetchAssetsJson(): Promise<RawAssets> {
  const r = await fetch(ASSETS_JSON, {
    headers: {
      Accept: "application/json",
    },
  });

  if (r.status !== 200) {
    throw new Error(`Failed to fetch assets json: ${r.status}`);
  }

  const json = await r.json();

  return AssetsSchema.parse(json);
}

export const Addons: Component = () => {
  const [addons] = createResource(fetchAssetsJson);

  function baseAddon(base: RawBaseRepo): RawAddon {
    return { name: "Base resourcepack", filename: base.filename, url: base.url };
  }

  return (
    <>
      <h2>Bedrock downloads</h2>

      <ErrorBoundary fallback={handleError}>
        <Show when={addons()} keyed fallback={<h2>Loading...</h2>}>
          {(addons) => (
            <>
              <h3>Minecraft Bedrock versions: {addons.repos.base.mc_versions}</h3>

              <div class="grid grid--col-2">
                <Addon base={addons.repos.base} raw={baseAddon(addons.repos.base)} />

                <For each={addons.repos.addons}>{(addon) => <Addon base={addons.repos.base} raw={addon} />}</For>
              </div>
            </>
          )}
        </Show>
      </ErrorBoundary>
    </>
  );
};
