import { saveAs } from "file-saver";
import JSZip from "jszip";
import { getBranch } from "../utils/branch";
import { fetchJson } from "../utils/json";
import { getLicense } from "../utils/license";
import { parseGlob } from "../utils/path";
import { globZip, moveFiles } from "../utils/zip";
import { ExclusiveAddonVariant, JavaAssets } from "./schemas/assets";
import { FormatDowngradeSchema, RawDowngradeLang, RawDowngrades } from "./schemas/downgrades";

const langsRe = parseGlob("assets/*/lang/*.json");

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

async function collectLangs(zip: JSZip): Promise<Map<string, Record<string, string>>> {
  const result = new Map<string, Record<string, string>>();

  const files = zip.file(langsRe);

  for (const file of files) {
    const raw = await file.async("string");
    const json = JSON.parse(raw) as Record<string, string>;

    result.set(file.name, json);
  }

  return result;
}

function getIds(addons: Record<string, boolean>): string {
  return Object.entries(addons)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join("-");
}

function applyLangDowngrade(lang: Record<string, string>, langDowngrade: RawDowngradeLang): void {
  if (langDowngrade.set !== undefined) {
    for (const [key, value] of Object.entries(langDowngrade.set)) {
      lang[key] = value;
    }
  }

  if (Array.isArray(langDowngrade.remove)) {
    for (const key of langDowngrade.remove) {
      delete lang[key];
    }
  }
}

async function applyDowngrade(
  assetsPath: string,
  downgrades: RawDowngrades,
  base: JSZip,
  version: string,
  feedback: (msg: string) => void
): Promise<void> {
  const name = downgrades.templates.format_name.replace("{version}", version);
  const jsonPath = downgrades.templates.format_path.replace("{name}", name);

  const json = await fetchJson(`${assetsPath}/${jsonPath}`, FormatDowngradeSchema);

  if (json.extends !== undefined) {
    await applyDowngrade(assetsPath, downgrades, base, json.extends, feedback);
  }

  if (json.files !== undefined) {
    let zip;

    if (json.files.copy === true) {
      feedback("Downloading downgrade assets ...");

      const zipPath = downgrades.templates.zips_path.replace("{name}", name);

      const r = await fetch(`${assetsPath}/${zipPath}`);
      zip = await JSZip.loadAsync(r.arrayBuffer());
    }

    if (Array.isArray(json.files.move)) {
      feedback('Applying downgrade action "move" ...');
      for (const action of json.files.move) {
        moveFiles(base, action.from, action.to);
      }
    }

    if (zip !== undefined) {
      feedback("Copying downgrade assets ...");
      await base.loadAsync(zip.generateAsync({ type: "arraybuffer" }), { createFolders: true });
    }

    if (Array.isArray(json.files.remove)) {
      const paths = globZip(base, json.files.remove);

      for (const path of paths) {
        base.remove(path);
      }
    }
  }

  if (json.langs !== undefined) {
    feedback("Applying language downgrade ...");

    const langs = await collectLangs(base);

    for (const [key, value] of Object.entries(json.langs)) {
      if (key === "*") {
        langs.forEach((lang) => {
          applyLangDowngrade(lang, value);
        });
      } else {
        let lang;

        for (const [path, value] of langs) {
          if (path.endsWith(`${key}.json`)) {
            lang = value;
            break;
          }
        }

        if (lang === undefined) {
          throw new Error(`No lang with name "${key}"`);
        }

        if (value.extends !== undefined) {
          const parent = json.langs[value.extends];

          if (parent === undefined) {
            throw new Error(`No lang downgrade for "${value.extends}" inherited from "${key}"`);
          }

          applyLangDowngrade(lang, parent);
        }

        applyLangDowngrade(lang, value);
      }
    }

    langs.forEach((value, path) => {
      base.file(path, JSON.stringify(value, null, 2));
    });
  }

  feedback("Updating pack.mcmeta ...");
  const mcmeta = base.file("pack.mcmeta");

  if (mcmeta === null) {
    throw new Error(`No pack.mcmeta`);
  }

  const mcmetaContent = await mcmeta.async("string");
  const mcmetaJson = JSON.parse(mcmetaContent);

  mcmetaJson.pack.pack_format = version;

  base.file("pack.mcmeta", JSON.stringify(mcmetaJson, null, 2));
}

export async function build(
  assetsPath: string,
  assets: JavaAssets,
  downgrades: RawDowngrades,
  exclusives: ExclusiveAddonVariant[],
  regulars: Record<string, boolean>,
  mods: Record<string, boolean>,
  downgrade: string,
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

      return JSZip.loadAsync(r.arrayBuffer());
    })
  );

  const [base, ...addons] = zips;

  if (base === undefined) {
    throw new Error("Base zip is undefined");
  }

  let addonsDone = 0;

  for (const addon of addons) {
    feedback(`Applying addons (${++addonsDone}/${addons.length}) ...`);

    const oldLangs = await collectLangs(base);
    const newLangs = await collectLangs(addon);

    await base.loadAsync(addon.generateAsync({ type: "arraybuffer" }), { createFolders: true });

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

  let formatVersion = assets.repos.base.pack_format;

  if (downgrade !== "none") {
    feedback("Applying downgrade ...");

    await applyDowngrade(assetsPath, downgrades, base, downgrade, feedback);

    formatVersion = downgrade;
  }

  feedback("Preparing the result ...");
  const blob = await base.generateAsync(
    {
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: { level: 9 },
    },
    ({ percent }) => {
      feedback(`Preparing the result ${percent.toFixed(0)}% ...`);
    }
  );

  feedback("Saving the result ...");
  const ids = [exclusives.map((variant) => variant.id).join(""), getIds(regulars), getIds(mods)].filter((value) => value.length > 0).join("-");
  const filename = assets.templates.filename.replace("{version}", assets.repos.base.version).replace("{format}", formatVersion).replace("{ids}", ids);

  saveAs(blob, filename);

  feedback("All done!");
}
