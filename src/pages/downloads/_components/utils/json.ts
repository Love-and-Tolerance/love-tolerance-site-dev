import { z, ZodTypeAny } from 'zod';

export async function fetchJson<T extends ZodTypeAny>(path: string, schema: T): Promise<z.infer<T>> {
  const r = await fetch(path, {
    headers: {
      Accept: "application/json",
    },
  });

  if (r.status !== 200) {
    throw new Error(`Failed to fetch json "${path}": ${r.status}`);
  }

  const json = await r.json();

  return schema.parse(json);
}
