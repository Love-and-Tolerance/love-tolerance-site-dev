import { makeRe } from "minimatch";

export function getBasename(path: string): string {
  const parts = path.split("/");

  return parts[parts.length - 1] ?? "";
}

export function parseGlob(pattern: string): RegExp {
  const regex = makeRe(pattern);

  if (regex === false) {
    throw new Error(`Failed to parse glob pattern "${pattern}"`);
  }

  return regex;
}
