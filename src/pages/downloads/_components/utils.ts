import type { JSX } from "solid-js/jsx-runtime";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export function handleError(err: unknown): JSX.Element {
  console.error(err);

  if (err instanceof ZodError) {
    err = fromZodError(err).message;
  }

  return `${err}`;
}
