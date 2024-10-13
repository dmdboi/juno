import { JSONToHTML } from "html-to-json-parser";
import { JSONContent } from "html-to-json-parser/dist/types";
import ejs from "ejs";

import { Template } from "../types/Template";
import { Page } from "../types/Page";

/**
 * Render the given page data into HTML using ejs templates.
 * @param data
 * @returns
 */
const renderPageHTML = async (data: Template | Page) => {
  // Turn the page content into HTML
  const tempHTML = await JSONToHTML(data.content[0] as JSONContent);

  // Replace template variables with actual data
  const template = ejs.compile(tempHTML as string);
  return template(data.data);
};

export { renderPageHTML };
