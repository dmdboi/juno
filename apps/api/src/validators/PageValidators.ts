/** Validates on POST/PUT endpoints */
import { z } from "zod";

export const CreatePageValidatora = z.object({
  name: z.string().min(3).max(32),
  content: z
    .object({
      type: z.string().refine(value => value === "main", {
        message: "Type must be a main",
      }),
      content: z.any(),
    })
    .array()
    .length(1),
});

export const UpdatePageValidator = z.object({
  id: z.string(),
  name: z.string().min(3).max(32),
  content: z
    .object({
      type: z.string().refine(value => value === "main", {
        message: "Type must be a main",
      }),
      content: z.any(),
    })
    .array()
    .length(1),
});
