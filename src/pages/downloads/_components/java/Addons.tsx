import { batch, Component, createMemo, createResource, ErrorBoundary, For, Show } from "solid-js";
import { createMutable } from "solid-js/store";
import { handleError } from "../utils";
import { Addon } from "./Addon";
import { AddonsInfo } from "./AddonsInfo";
import { AssetsSchema } from "./schemas";

const ASSETS_JSON = "https://raw.githubusercontent.com/Love-and-Tolerance/pack-dev-tools/mane/assets/java.json";

async function fetchAssetsJson(): Promise<AddonsInfo> {
  const r = await fetch(ASSETS_JSON, {
    headers: {
      Accept: "application/json",
    },
  });

  if (r.status !== 200) {
    throw new Error(`Failed to fetch assets json: ${r.status}`);
  }

  const json = await r.json();
  const raw = AssetsSchema.parse(json);

  return new AddonsInfo(raw);
}

interface InternalProps {
  info: AddonsInfo;
}

const AddonsInternal: Component<InternalProps> = (props) => {
  const selectedIds = createMutable(props.info.addons.map((addon) => addon.defaultVariant.id));

  const filename = createMemo(() => {
    return props.info.base.getFilename(selectedIds);
  });

  function getId(pos: number): string {
    return selectedIds[pos - 1] ?? "x";
  }

  function selectId(pos: number, id: string): void {
    selectedIds[pos - 1] = id;
  }

  function reset(): void {
    batch(() => {
      for (let i = 0; i < selectedIds.length; i++) {
        selectedIds[i] = "x";
      }
    });
  }

  function resetDefaults(): void {
    batch(() => {
      for (const addon of props.info.addons) {
        selectedIds[addon.idPos - 1] = addon.defaultVariant.id;
      }
    });
  }

  return (
    <>
      <h3>Minecraft versions: {props.info.base.mcVersions}</h3>

      <div class="flex flex--row flex--small">
        <button class="btn btn--primary btn--medium" type="button" onClick={reset}>
          Reset
        </button>

        <button class="btn btn--primary btn--medium" type="button" onClick={resetDefaults}>
          Select defaults
        </button>

        <a class="btn btn--primary btn--medium" href={filename()}>
          <span class="btn-label">Download</span>

          <span class="btn-icon btn-icon--right">
            <i class="fas fa-arrow-up-right-from-square" />
          </span>
        </a>
      </div>

      <div class="grid grid--col-2">
        <For each={props.info.addons}>
          {(addon) => (
            <Addon
              info={addon}
              defaultImage={props.info.base.image}
              variantId={getId(addon.idPos)}
              onVariantSelect={selectId.bind(null, addon.idPos)}
            />
          )}
        </For>
      </div>
    </>
  );
};

export const Addons: Component = () => {
  const [addons] = createResource(fetchAssetsJson);

  return (
    <>
      <h2>Custom Java downloads</h2>

      <ErrorBoundary fallback={handleError}>
        <Show when={addons()} keyed fallback={<h2>Loading...</h2>}>
          {(addons) => <AddonsInternal info={addons} />}
        </Show>
      </ErrorBoundary>
    </>
  );
};
