/** Validates on POST/PUT endpoints */
import { z } from "zod";

export const CreateTemplateValidator = z.object({
  name: z.string().min(3).max(32),
  content: z
    .object({
      type: z.string().refine(value => value === "body", {
        message: "Type must be a body",
      }),
      content: z.any(),
    })
    .array()
    .length(1),
});

export const UpdateTemplateValidator = z.object({
  id: z.string(),
  name: z.string().min(3).max(32),
  content: z
    .object({
      type: z.string().refine(value => value === "body", {
        message: "Type must be a body",
      }),
      content: z.any(),
    })
    .array()
    .length(1),
});
