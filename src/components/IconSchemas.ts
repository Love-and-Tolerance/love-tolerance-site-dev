import iconsRaw from "@fortawesome/fontawesome-free/metadata/icons.yml";
import { z } from "zod";

export type Icons = z.infer<typeof IconsSchema>;

export const IconsSchema = z.record(
  z.object({
    styles: z.array(z.string()),
    unicode: z.string(),
  })
);

export const ICONS: Icons = IconsSchema.parse(iconsRaw);
