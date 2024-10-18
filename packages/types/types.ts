interface ContentBody {
  type: string;
  attributes?: {
    href?: string;
    src?: string;
    alt?: string;
    style?: string;
    class?: string;
  };
  content: ContentBody[] | string[];
}

interface Content {
  id: string;
  name: string;
  ref: string;
  type: "page" | "component" | "template";
  content?: Content[] | string[];
}

interface StoreContentRequest {
  name: string;
  type: "component" | "template";
  content: ContentBody[];
}

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

interface Component {
  id: string;
  name: string;
  ref: string;
  content: Content[] | string[];
  data: Record<string, any>;
  html: string;
}

interface Template {
  id: string;
  name: string;
  ref: string;
  content: Content[];
  data: Record<string, any>;
  meta: Record<string, any>;
  placeholder?: string;
}

export type { ContentBody, Content, StoreContentRequest, Page, Component, Template };