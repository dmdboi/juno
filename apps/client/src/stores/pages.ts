import { ref } from "vue";
import { defineStore } from "pinia";
// @ts-ignore
import { JSONToHTML, HTMLToJSON } from "html-to-json-parser";

import type { Page } from "@/types/pages";
import type { Content } from "@/types/content";

export const usePageStore = defineStore("pages", () => {
  const page = ref({} as Page);
  const clonedPage = ref({} as Page);

  /** Sets the current Component in the store and creates a clone */
  async function setPage(pageData: Page) {
    page.value = pageData;
    clone();
  }

  /** Resets the current Component in the store to its original state */
  function resetPage() {
    page.value = clonedPage.value;
  }

  /** Clones the current Component in the store */
  /** ONLY set in setComponent */
  function clone() {
    clonedPage.value = JSON.parse(JSON.stringify(page.value));
  }

  /** Updates a property within Component */
  /** If updating "content" property, pass an array */
  function updatePageProperty(property: string, value: string | number | boolean | Array<any>) {
    // @ts-ignore
    page.value[property] = value;
  }

  /** Converts and returns the first object in Component's content array to HTML */
  async function getContentInHTML() {
    return (await JSONToHTML(page.value.content));
  }

  /** Returns the first object in Component's content array */
  function getContentInJSON() {
    return page.value.content[0];
  }

  /** Sets the first object in Component's content array to the provided object */
  function setContentInJSON(content: Content) {
    page.value.content = [content];
  }

  /** Sets the first object in Component's content array to the provided HTML (converted to JSON) */
  async function setContentInHTML(content: string) {
    const json = await HTMLToJSON(content);
    setContentInJSON(json);
  }

  return {
    page,
    setPage,
    resetPage,
    updatePageProperty,
    getContentInHTML,
    setContentInHTML,
    getContentInJSON,
    setContentInJSON,
  };
});
