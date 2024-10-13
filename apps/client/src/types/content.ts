interface Content {
  id?: string;
  name?: string;
  ref?: string;
  type: string;
  content?: Content[] | string[];
  data?: Record<string, any>;
}

interface ContentBody {
  repeatable?: string;
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

interface ContentData {
  [key: string]: RepeatableData | string | number | boolean | null;
}

interface RepeatableData {
  key: string;
  value: string;
}

interface StoreContentRequest {
  name: string;
  type: "component" | "template";
  content: ContentBody[];
  data: ContentData;
}

export type { Content, ContentData, RepeatableData, StoreContentRequest, ContentBody };
