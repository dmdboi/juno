import type { Content } from "./content";

interface Page {
  id?: string;
  name: string;
  ref: string;
  content: Content[] | string[];
  data?: Record<string, any>;
  meta: Record<string, any>;
  template?: string;
  slot?: string;
}

export type { Page };
