import JSZip from "jszip";
import { getBasename, parseGlob } from "./path";

export function globZip(zip: JSZip, patterns: string[]): string[] {
  const result: string[] = [];

  for (const pattern of patterns) {
    const regex = parseGlob(pattern);

    zip.forEach((path) => {
      if (regex.test(path)) {
        result.push(path);
      }
    });
  }

  return result;
}

export function moveFiles(zip: JSZip, from: string | string[], to: string): void {
  if (typeof from === "string") {
    from = [from];
  }

  from = globZip(zip, from);

  const sources = from.map((path) => {
    const file = zip.file(path);

    if (file === null) {
      throw new Error(`No file at "${path}"`);
    }

    return file;
  });

  if (to.endsWith("/")) {
    const dest = zip.folder(to);

    if (dest === null) {
      throw new Error(`Failed to create folder "${to}"`);
    }

    for (const src of sources) {
      const basename = getBasename(src.name);
      dest.file(basename, src.async("arraybuffer"));
    }
  } else {
    for (const src of sources) {
      zip.file(to, src.async("arraybuffer"));
    }
  }
}
