export function emptyObject(obj: Record<string | number | symbol, unknown>): void {
  for (const key in obj) {
    delete obj[key];
  }
}
