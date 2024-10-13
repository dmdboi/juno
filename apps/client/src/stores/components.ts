import { ref } from "vue";
import { defineStore } from "pinia";
// @ts-ignore
import { JSONToHTML, HTMLToJSON } from "html-to-json-parser";

import type { ElementType } from "@/types";

export const useComponentStore = defineStore("components", () => {
  const component = ref({} as ElementType);
  const clonedComponent = ref({} as ElementType);

  /** Sets the current Component in the store and creates a clone */
  async function setComponent(componentData: ElementType) {
    component.value = componentData;

    clone();
  }

  /** Resets the current Component in the store to its original state */
  function resetComponent() {
    component.value = clonedComponent.value;
  }

  /** Clones the current Component in the store */
  /** ONLY set in setComponent */
  function clone() {
    clonedComponent.value = JSON.parse(JSON.stringify(component.value));
  }

  /** Updates a property within Component */
  /** If updating "content" property, pass an array */
  function updateComponentProperty(property: string, value: string | number | boolean | Array<any>) {
    // @ts-ignore
    component.value[property] = value;
  }

  /** Converts and returns the first object in Component's content array to HTML */
  async function getContentInHTML() {
    return await JSONToHTML(component.value.content[0]);
  }

  /** Returns the first object in Component's content array */
  function getContentInJSON() {
    return component.value.content[0];
  }

  /** Sets the first object in Component's content array to the provided object */
  function setContentInJSON(content: ElementType) {
    component.value.content = [content];
  }

  /** Sets the first object in Component's content array to the provided HTML (converted to JSON) */
  async function setContentInHTML(content: string) {
    const json = await HTMLToJSON(content);
    setContentInJSON(json);
  }

  return {
    component,
    setComponent,
    resetComponent,
    updateComponentProperty,
    getContentInHTML,
    setContentInHTML,
    getContentInJSON,
    setContentInJSON,
  };
});
