import { ref } from "vue";
import { defineStore } from "pinia";
import { getRandomId } from "@/utils/id";

import type { ElementType } from "@/types";

/** ElementStore */
/** This store is used for individual elements within a Component, Page or Template's content array */
export const useElementStore = defineStore("elements", () => {
  const currentHTML = ref([] as ElementType[]);

  const currentTab = ref("elements");

  const selectedElement = ref({} as ElementType);

  /** Set the current component in the store */
  function setCurrentComponent(component: ElementType) {
    // Traverse component and set IDs
    function traverseComponent(content: ElementType[]) {
      content.forEach(item => {
        // Assigning a random ID enables us to track the element in the store and update it
        item.id = getRandomId();

        if (item.content && typeof item.content[0] !== "string") {
          traverseComponent(item.content.filter((child): child is ElementType => typeof child !== "string"));
        }
      });
    }

    traverseComponent(component.content as ElementType[]);

    currentHTML.value = component.content as ElementType[];

    console.log("setCurrentComponent", component);
  }

  /** Set the selected Element in the store */
  function selectElement(element: ElementType) {
    selectedElement.value = element;

    // Add "attributes" object to the selected element
    if(!selectedElement.value.attributes) {
      selectedElement.value.attributes = {};
    }

    currentTab.value = "attributes";
  }

  /** Clear the currently selected Element from the store */
  function clearSelection() {
    selectedElement.value = {} as ElementType;
  }

  /** Set a property on SelectedElement */
  function setElementProperty(property: string, value: string | Record<string, string | number>) {
    // @ts-ignore
    selectedElement.value[property] = value;
  }

  /** Update the element in CurrentHTML */
  function updateElement(element: ElementType) {
    // Traverse the currentHTML array and find the element with the same ID
    // Replace the element with the updated element
    function traverseContent(content: ElementType[]) {
      if (typeof content[0] === "string") {
        return;
      }

      content.forEach(item => {
        if (item.id === element.id) {
          item = element;
        }

        if (item.content && typeof item.content[0] !== "string") {
          traverseContent(item.content.filter((child): child is ElementType => typeof child !== "string"));
        }
      });
    }

    traverseContent(currentHTML.value);
  }

  function deleteElement() {
    console.log("deleteElement", selectedElement.value);

    // TODO: Find the element in the currentHTML array and remove it
    clearSelection();
  }

  return {
    selectedElement,
    selectElement,
    clearSelection,
    setElementProperty,
    updateElement,
    deleteElement,
    currentTab,
    currentHTML,
    setCurrentComponent,
  };
});
