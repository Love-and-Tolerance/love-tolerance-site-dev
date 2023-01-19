import { assets as ASSETS_PATH } from "@/data/links.json";
import classNames from "classnames";
import { batch, Component, createMemo, createResource, createSignal, ErrorBoundary, For, Show } from "solid-js";
import { createMutable } from "solid-js/store";
import { getRawContentUrl, parseGitHubUrl } from "../utils/git";
import { fetchJson } from "../utils/json";
import { emptyObject } from "../utils/object";
import { handleError } from "../utils/zod";
import { BasicAddon } from "./BasicAddon";
import { build } from "./build";
import { Downgrades } from "./Downgrades";
import { BasicAddonRaw, JavaAssets, JavaAssetsSchema, VariantAddonRaw, VariantRaw } from "./schemas/assets";
import { DowngradesSchema, RawDowngrades } from "./schemas/downgrades";
import { VariantAddon } from "./VariantAddon";

const ASSETS_JSON = `${ASSETS_PATH}/assets/java.json`;
const DOWNGRADES_JSON = `${ASSETS_PATH}/assets/downgrades/java.json`;

export const Addons: Component = () => {
  async function fetchJsons(): Promise<[JavaAssets, RawDowngrades]> {
    const assets = fetchJson(ASSETS_JSON, JavaAssetsSchema);
    const downgrades = fetchJson(DOWNGRADES_JSON, DowngradesSchema);

    return Promise.all([assets, downgrades]);
  }

  const [jsons] = createResource(fetchJsons);

  return (
    <>
      <h2>Custom Java downloads</h2>

      <ErrorBoundary fallback={handleError}>
        <Show when={jsons()} keyed fallback={<h2>Loading...</h2>}>
          {([assets, downgrades]) => <AddonsInternal assets={assets} downgrades={downgrades} />}
        </Show>
      </ErrorBoundary>
    </>
  );
};

interface InternalProps {
  assets: JavaAssets;
  downgrades: RawDowngrades;
}

function collectVariantAddons(state: Record<number, string>, addons: VariantAddonRaw[]): [VariantAddonRaw, VariantRaw | null][] {
  return addons.map((addon) => {
    const selectedVariantId = state[addon.id_pos] ?? addon.default_variant;
    const selectedVariant = addon.variants.find((variant) => variant.id === selectedVariantId);

    return [addon, selectedVariant] as [VariantAddonRaw, VariantRaw | null];
  });
}

function collectBasicAddons(state: Record<string, boolean>, addons: BasicAddonRaw[]): BasicAddonRaw[] {
  return addons.filter((addon) => {
    return state[addon.id] ?? addon.recommended;
  });
}

const AddonsInternal: Component<InternalProps> = (props) => {
  const variantsState = createMutable<Record<number, string>>({});
  const regularState = createMutable<Record<string, boolean>>({});
  const modsState = createMutable<Record<string, boolean>>({});

  const [busy, setBusy] = createSignal(false);
  const [message, setMessage] = createSignal("");
  const [selectedDowngrade, setSelectedDowngrade] = createSignal("none");

  const defaultImage = createMemo(() => {
    const [owner, name] = parseGitHubUrl(props.assets.repos.base.url);

    return getRawContentUrl(owner, name, "HEAD", "pack.png");
  });

  const finalVariants = createMemo(() => {
    return collectVariantAddons(variantsState, props.assets.repos.addons.exclusive);
  });

  const finalRegular = createMemo(() => {
    return collectBasicAddons(regularState, props.assets.repos.addons.regular);
  });

  const finalMods = createMemo(() => {
    return collectBasicAddons(modsState, props.assets.repos.addons.mods);
  });

  const triggers = createMemo(() => {
    const result: string[] = [];

    for (const [, variant] of finalVariants()) {
      if (variant?.trigger !== undefined) {
        result.push(variant.trigger);
      }
    }

    return result;
  });

  function reset() {
    batch(() => {
      setSelectedDowngrade("none");
      emptyObject(variantsState);
      emptyObject(regularState);
      emptyObject(modsState);
    });
  }

  async function runBuild(): Promise<void> {
    setBusy(true);

    try {
      await build(
        ASSETS_PATH,
        props.assets,
        props.downgrades,
        triggers(),
        finalVariants(),
        finalRegular(),
        finalMods(),
        selectedDowngrade(),
        setMessage
      );
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
      setBusy(false);
    }, 3000);
  }

  return (
    <>
      <div class="hstack hstack--md">
        <button type="button" class="btn btn--primary btn--medium" disabled={busy()} onClick={runBuild}>
          <span>Build</span>
          <i class={classNames("fas", busy() ? "fa-spinner" : "fa-hammer")} classList={{ "fa-spin": busy() }} />
        </button>

        <button type="button" class="btn btn--danger btn--medium" onClick={reset}>
          <span>Reset</span>
          <i class="fas fa-rotate-right" />
        </button>

        <div>{message}</div>
      </div>

      <Downgrades
        data={props.downgrades}
        latestVersion={props.assets.repos.base.mc_versions}
        value={selectedDowngrade()}
        onChange={setSelectedDowngrade}
      />

      <VariantAddons
        title="Exclusive add-ons"
        triggers={triggers()}
        state={variantsState}
        defaultImage={defaultImage()}
        addons={props.assets.repos.addons.exclusive}
      />
      <BasicAddons title="Regular add-ons" triggers={triggers()} state={regularState} addons={props.assets.repos.addons.regular} />
      <BasicAddons title="Mod add-ons" triggers={triggers()} state={modsState} addons={props.assets.repos.addons.mods} />
    </>
  );
};

interface VariantAddonsProps {
  title: string;
  triggers: string[];
  state: Record<number, string>;
  defaultImage: string;
  addons: VariantAddonRaw[];
}

const VariantAddons: Component<VariantAddonsProps> = (props) => {
  return (
    <>
      <h4>{props.title}</h4>

      <div class="hcards">
        <For each={props.addons}>
          {(addon) => (
            <VariantAddon
              triggers={props.triggers}
              defaultImage={props.defaultImage}
              data={addon}
              selectedVariant={props.state[addon.id_pos] ?? addon.default_variant}
              onVariant={(id) => (props.state[addon.id_pos] = id)}
            />
          )}
        </For>
      </div>
    </>
  );
};

interface BasicAddonsProps {
  title: string;
  triggers: string[];
  state: Record<string, boolean>;
  addons: BasicAddonRaw[];
}

const BasicAddons: Component<BasicAddonsProps> = (props) => {
  return (
    <>
      <h4>{props.title}</h4>

      <div class="hcards">
        <For each={props.addons}>
          {(addon) => (
            <BasicAddon
              triggers={props.triggers}
              data={addon}
              active={props.state[addon.id] ?? addon.recommended}
              onToggle={(value) => (props.state[addon.id] = value)}
            />
          )}
        </For>
      </div>
    </>
  );
};
