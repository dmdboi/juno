/** Validates on POST/PUT endpoints */
import { z } from "zod";

const meta = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    url: z.string().optional(),
    type: z.string().optional(), // "website" | "article" | "profile" | "video" | "audio"
  })
  .optional();

export const CreateSiteValidator = z.object({
  name: z.string().min(3).max(32),
  domain: z.string().min(3).optional(),
  favicon: z.string().min(3).optional(),
  meta: meta,
});

export const UpdateSiteValidator = z.object({
  id: z.string(),
  name: z.string().min(3).max(32),
  domain: z.string().min(3).optional(),
  favicon: z.string().min(3).optional(),
  meta: meta,
});
