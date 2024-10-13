import { Content } from "./Content";

interface Page {
  id: string;
  name: string;
  ref: string;
  content: Content[];
  data: Record<string, any>;
  meta: Record<string, any>;
  template?: string;
  slot?: string;
}

export { Page };
