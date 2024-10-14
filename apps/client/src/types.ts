import type { Content } from "./types/content";

export interface ElementType {
  id: string;
  type: string;
  name: string;
  ref: string;
  content: Content[];
  attributes?: {
    id?: string;
    class?: string;
    style?: Record<string, string | number>;
    href?: string;
    alt?: string;
    src?: string;
    target?: string;
  };
  is_parent?: boolean;
  is_component?: boolean;
}
