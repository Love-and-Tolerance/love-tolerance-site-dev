import { saveAs } from "file-saver";
import JSZip from "jszip";
import { makeRe } from "minimatch";
import { getBranch } from "../utils/branch";
import { getLicense } from "../utils/license";
import { ExclusiveAddonVariant, JavaAssets } from "./schemas";

const langsRe = (() => {
  const result = makeRe("assets/*/lang/*.json");

  if (result === false) {
    throw new Error("Invalid glob");
  }

  return result;
})();

interface ParseAddonsResult {
  zips: string[];
  license: string | undefined;
}

function parseAddons(
  assets: JavaAssets,
  exclusives: ExclusiveAddonVariant[],
  regulars: Record<string, boolean>,
  mods: Record<string, boolean>
): ParseAddonsResult {
  const sortedExclusives = [...assets.repos.addons.exclusive].sort((a, b) => {
    return a.apply_order - b.apply_order;
  });

  const zips = [assets.templates.base_zip_name];
  let license;

  for (const addon of sortedExclusives) {
    const variant = exclusives[addon.id_pos - 1];

    if (variant === undefined) {
      throw new Error(`No variant at index ${addon.id_pos}`);
    }

    if (variant.url === undefined) continue;

    const branch = getBranch(exclusives, variant.branch);
    const filename = assets.templates.exclusive_addon_zip_name
      .replace("{id_pos}", addon.id_pos.toString())
      .replace("{variant}", variant.id)
      .replace("{branch}", branch);

    zips.push(filename);

    const addonLicense = getLicense(exclusives, addon.license);

    if (addonLicense !== undefined) {
      license = addonLicense;
    }
  }

  for (const addon of assets.repos.addons.regular) {
    if (regulars[addon.id] !== true) continue;

    const branch = getBranch(exclusives, addon.branch);
    const filename = assets.templates.regular_addon_zip_name.replace("{id}", addon.id).replace("{branch}", branch);

    zips.push(filename);

    const addonLicense = getLicense(exclusives, addon.license);

    if (addonLicense !== undefined) {
      license = addonLicense;
    }
  }

  for (const addon of assets.repos.addons.mods) {
    if (mods[addon.id] !== true) continue;

    const filename = assets.templates.mod_addon_zip_name.replace("{id}", addon.id);

    zips.push(filename);
  }

  return { zips, license };
}

function collectLangs(zip: JSZip): Map<string, Record<string, string>> {
  const result = new Map<string, Record<string, string>>();

  zip.forEach(async (path, file) => {
    if (langsRe.test(path)) {
      const raw = await file.async("string");
      const json = JSON.parse(raw) as Record<string, string>;

      result.set(path, json);
    }
  });

  return result;
}

function getIds(addons: Record<string, boolean>): string {
  return Object.entries(addons)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join("-");
}

export async function build(
  assetsPath: string,
  assets: JavaAssets,
  exclusives: ExclusiveAddonVariant[],
  regulars: Record<string, boolean>,
  mods: Record<string, boolean>,
  feedback: (msg: string) => void
): Promise<void> {
  feedback("Downloading assets ...");
  let zipsDone = 0;
  const parseResult = parseAddons(assets, exclusives, regulars, mods);
  const zips = await Promise.all(
    parseResult.zips.map(async (name) => {
      name = assets.templates.zips_path.replace("{name}", name);
      const r = await fetch(`${assetsPath}/${name}`);

      feedback(`Downloading assets (${++zipsDone}/${parseResult.zips.length}) ...`);

      return JSZip.loadAsync(r.blob());
    })
  );

  const [base, ...addons] = zips;

  if (base === undefined) {
    throw new Error("Base zip is undefined");
  }

  let addonsDone = 0;

  for (const addon of addons) {
    feedback(`Building the pack (${++addonsDone}/${addons.length}) ...`);

    const oldLangs = collectLangs(base);
    const newLangs = collectLangs(addon);

    await base.loadAsync(addon.generateAsync({ type: "blob" }), { createFolders: true });

    for (const [name, newLang] of newLangs) {
      const oldLang = oldLangs.get(name);

      if (oldLang === undefined) continue;

      const result = { ...oldLang };

      for (const [key, value] of Object.entries(newLang)) {
        result[key] = value;
      }

      base.file(name, JSON.stringify(result, null, 2));
    }
  }

  if (parseResult.license !== undefined) {
    feedback("Applying license override ...");

    const r = await fetch(parseResult.license);

    base.file("LICENSE", r.arrayBuffer());
  }

  feedback("Preparing the result ...");
  const blob = await base.generateAsync({ type: "blob" }, ({ percent }) => {
    feedback(`Preparing the result ${percent.toFixed(0)}% ...`);
  });

  feedback("Saving the result ...");
  const ids = [exclusives.map((variant) => variant.id).join(""), getIds(regulars), getIds(mods)].filter((value) => value.length > 0).join("-");
  const filename = assets.templates.filename.replace("{version}", assets.repos.base.version).replace("{ids}", ids);

  saveAs(blob, filename);

  feedback("All done!");
}
