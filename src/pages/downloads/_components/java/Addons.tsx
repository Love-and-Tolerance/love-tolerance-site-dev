import { assets as ASSETS_PATH } from "@/data/links.json";
import { Component, createMemo, createResource, createSignal, ErrorBoundary, For, Show } from "solid-js";
import { getVariant } from "../utils/addon";
import { getRawContentUrl, parseGitHubUrl } from "../utils/git";
import { handleError } from "../utils/zod";
import { build } from "./build";
import { ExclusiveAddon } from "./ExclusiveAddon";
import { ModAddon } from "./ModAddon";
import { RegularAddon } from "./RegularAddon";
import { ExclusiveAddonRaw, ExclusiveAddonVariant, JavaAssets, JavaAssetsSchema } from "./schemas";

const ASSETS_JSON = `${ASSETS_PATH}/assets/java.json`;

async function fetchAssetsJson(): Promise<JavaAssets> {
  const r = await fetch(ASSETS_JSON, {
    headers: {
      Accept: "application/json",
    },
  });

  if (r.status !== 200) {
    throw new Error(`Failed to fetch assets json: ${r.status}`);
  }

  const json = await r.json();

  return JavaAssetsSchema.parse(json);
}

function getRecommendedExclusives(addons: ExclusiveAddonRaw[]): ExclusiveAddonVariant[] {
  return addons.map((addon) => {
    return getVariant(addon, addon.default_variant);
  });
}

interface OtherAddon {
  id: string;
  default_enabled: boolean;
}

function getRecommendedOthers(addons: OtherAddon[]): Record<string, boolean> {
  const result: Record<string, boolean> = {};

  for (const addon of addons) {
    result[addon.id] = addon.default_enabled;
  }

  return result;
}

interface InternalProps {
  assets: JavaAssets;
}

const AddonsInternal: Component<InternalProps> = ({ assets }) => {
  const [busy, setBusy] = createSignal(false);
  const [message, setMessage] = createSignal("");

  const [selectedExclusives, setSelectedExclusives] = createSignal(getRecommendedExclusives(assets.repos.addons.exclusive));
  const [selectedRegulars, setSelectedRegulars] = createSignal(getRecommendedOthers(assets.repos.addons.regular));
  const [selectedMods, setSelectedMods] = createSignal(getRecommendedOthers(assets.repos.addons.mods));

  const defaultImage = createMemo(() => {
    const [owner, name] = parseGitHubUrl(assets.repos.base.url);

    return getRawContentUrl(owner, name, "HEAD", "pack.png");
  });

  function getSelectedVariant(pos: number): ExclusiveAddonVariant {
    const variant = selectedExclusives()[pos - 1];

    if (variant === undefined) {
      throw new Error(`No variant at pos ${pos}`);
    }

    return variant;
  }

  function selectVariant(pos: number, variant: ExclusiveAddonVariant): void {
    setSelectedExclusives((prev) => {
      const newValue = [...prev];

      newValue[pos - 1] = variant;

      return newValue;
    });
  }

  function selectRegular(id: string, value: boolean): void {
    setSelectedRegulars((prev) => {
      return { ...prev, [id]: value };
    });
  }

  function selectMod(id: string, value: boolean): void {
    setSelectedMods((prev) => {
      return { ...prev, [id]: value };
    });
  }

  function resetDefaults(): void {
    setSelectedExclusives(getRecommendedExclusives(assets.repos.addons.exclusive));
    setSelectedRegulars(getRecommendedOthers(assets.repos.addons.regular));
    setSelectedMods(getRecommendedOthers(assets.repos.addons.mods));
  }

  async function runBuild(): Promise<void> {
    setBusy(true);

    try {
      await build(ASSETS_PATH, assets, selectedExclusives(), selectedRegulars(), selectedMods(), setMessage);
    } catch (err) {
      if (err instanceof Error) {
        setMessage(`${err.name}: ${err.message}`);
      } else {
        setMessage(String(err));
      }

      console.error(err);
    }

    setTimeout(() => {
      setMessage("");
    }, 3000);

    setBusy(false);
  }

  return (
    <>
      <h3>Minecraft versions: {assets.repos.base.mc_versions}</h3>

      <div class="flex flex--row flex--small flex--center">
        <button class="btn btn--primary btn--medium" type="button" onClick={resetDefaults}>
          Reset defaults
        </button>

        <button
          class="btn btn--primary btn--medium"
          type="button"
          disabled={busy()}
          onClick={(e) => {
            e.preventDefault();
            runBuild();
          }}
        >
          <span class="btn-label">Download</span>

          <span class="btn-icon btn-icon--right">
            <i class={`fas ${busy() ? "fa-spinner" : "fa-download"}`} classList={{ "fa-spin": busy() }} />
          </span>
        </button>

        <div>{message()}</div>
      </div>

      <h4>Exclusive addons</h4>

      <div class="grid grid--col-2">
        <For each={assets.repos.addons.exclusive}>
          {(addon) => (
            <ExclusiveAddon
              addon={addon}
              defaultImage={defaultImage()}
              variantId={getSelectedVariant(addon.id_pos).id}
              selectedExclusives={selectedExclusives()}
              onVariantSelect={selectVariant.bind(null, addon.id_pos)}
            />
          )}
        </For>
      </div>

      <h4>Regular addons</h4>

      <div class="grid grid--col-2">
        <For each={assets.repos.addons.regular}>
          {(addon) => (
            <RegularAddon
              addon={addon}
              selectedExclusives={selectedExclusives()}
              selected={selectedRegulars()[addon.id] === true}
              onSelect={selectRegular.bind(null, addon.id)}
            />
          )}
        </For>
      </div>

      <h4>Mod addons</h4>

      <div class="grid grid--col-2">
        <For each={assets.repos.addons.mods}>
          {(addon) => (
            <ModAddon
              addon={addon}
              selectedExclusives={selectedExclusives()}
              selected={selectedMods()[addon.id] === true}
              onSelect={selectMod.bind(null, addon.id)}
            />
          )}
        </For>
      </div>
    </>
  );
};

export const Addons: Component = () => {
  const [assets] = createResource(fetchAssetsJson);

  return (
    <>
      <h2>Custom Java downloads</h2>

      <ErrorBoundary fallback={handleError}>
        <Show when={assets()} keyed fallback={<h2>Loading...</h2>}>
          {(assets) => <AddonsInternal assets={assets} />}
        </Show>
      </ErrorBoundary>
    </>
  );
};
