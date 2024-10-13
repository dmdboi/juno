import { Content } from "./Content";

interface Component {
  id: string;
  name: string;
  ref: string;
  content: Content[] | string[];
  data: Record<string, any>;
  html: string;
}

export { Component };
