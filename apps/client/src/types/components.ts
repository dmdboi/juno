import type { Content } from "./content";

interface Component {
  id: string;
  name: string;
  ref: string;
  content: Content[] | string[];
  data: Record<string, any>;
}

export type { Component };
