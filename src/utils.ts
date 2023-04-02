import { join } from "path/posix";

export function p(path: string) {
  return join(import.meta.env.BASE_URL, path);
}
