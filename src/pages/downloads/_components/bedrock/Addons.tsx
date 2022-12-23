import { assets as ASSETS_PATH } from "@/data/links.json";
import { Component, createResource, ErrorBoundary, For, Show } from "solid-js";
import { handleError } from "../utils/zod";
import { Addon } from "./Addon";
import { BedrockAddon, BedrockAssets, BedrockAssetsSchema, BedrockBaseRepo } from "./schemas";

const ASSETS_JSON = `${ASSETS_PATH}/assets/bedrock.json`;

async function fetchAssetsJson(): Promise<BedrockAssets> {
  const r = await fetch(ASSETS_JSON, {
    headers: {
      Accept: "application/json",
    },
  });

  if (r.status !== 200) {
    throw new Error(`Failed to fetch assets json: ${r.status}`);
  }

  const json = await r.json();

  return BedrockAssetsSchema.parse(json);
}

export const Addons: Component = () => {
  const [assets] = createResource(fetchAssetsJson);

  function baseAddon(base: BedrockBaseRepo): BedrockAddon {
    return { name: "Base resourcepack", filename: base.filename, url: base.url };
  }

  return (
    <>
      <h2>Bedrock downloads</h2>

      <ErrorBoundary fallback={handleError}>
        <Show when={assets()} keyed fallback={<h2>Loading...</h2>}>
          {(assets) => (
            <>
              <h3>Minecraft Bedrock versions: {assets.repos.base.mc_versions}</h3>

              <div class="grid grid--col-2">
                <Addon assets={assets} addon={baseAddon(assets.repos.base)} />

                <For each={assets.repos.addons}>{(addon) => <Addon assets={assets} addon={addon} />}</For>
              </div>
            </>
          )}
        </Show>
      </ErrorBoundary>
    </>
  );
};
