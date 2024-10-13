import { ContentBody, RepeatableData } from "../types/Content";

/**
 * Recursively find all repeatable content objects in a content array and return them in an array for further processing.
 * @param contentArray
 * @returns
 */
const findRepeatableContent = async (contentArray: Array<string | ContentBody>): Promise<ContentBody[]> => {
  let repeatableItems: ContentBody[] = [];

  if (!Array.isArray(contentArray)) {
    return repeatableItems;
  }

  // Helper function to recursively traverse content fields
  function traverseContent(content: string | ContentBody) {
    if (typeof content === "object" && "repeatable" in content) {
      // If the content is an object and has the "repeatable" field, add it to the array
      repeatableItems.push(content);
    }

    // If the content is an object and contains nested content, recursively process it
    if (typeof content === "object" && Array.isArray(content.content)) {
      content.content.forEach(traverseContent); // Recursively process nested content
    }
  }

  // Start traversal with the top-level content array
  contentArray.forEach(traverseContent);

  return repeatableItems; // Return the array of repeatable content objects
};

/**
 * Build repeatable content from a repeatable content object.
 */
const buildRepeatableContent = async (template: ContentBody, data: RepeatableData[]) => {
  let newContentArray: ContentBody[] = [];

  let repeatable = template.repeatable;

  data.forEach(item => {
    // Clone the template object for each item in the data array
    const clonedItem: ContentBody = JSON.parse(JSON.stringify(template));

    // Ensure there is an "a" tag in the content to modify
    const anchorElement = clonedItem.content[0];

    // Delete "repeatable" field from the cloned object
    if ("repeatable" in clonedItem) {
      delete clonedItem.repeatable;
    }

    // Replace the placeholder with the actual data
    if (typeof anchorElement === "string") {
      clonedItem.content[0] = item.key;
    }

    // If the content is an object and is an anchor element
    if (typeof anchorElement === "object" && anchorElement.type === "a") {
      // Replace the href placeholder ':value' with the actual slug
      if (anchorElement.attributes && anchorElement.attributes.href) {
        anchorElement.attributes.href = anchorElement.attributes.href.replace(":value", item.value);
      }

      // Replace the content (anchor text) with the name
      anchorElement.content = [item.key];
    }

    // Add the newly populated object to the array
    newContentArray.push(clonedItem);
  });

  return {
    type: template.type,
    repeatable,
    content: newContentArray,
  };
};

/**
 * Insert repeatable content into the content array.
 */
const insertRepeatableContent = async (contentArray: Array<string | ContentBody>, repeatableContent: ContentBody[], repeatableKey: string) => {
  // Helper function to recursively traverse content fields, keeping track of the parent
  function traverseContent(content: string | ContentBody, parent: ContentBody | null = null, parentIndex: number | null = null) {
    if (typeof content === "object" && "repeatable" in content && content.repeatable === repeatableKey) {
      // If the content has the "repeatable" field, replace the parent's content array at the appropriate index
      if (parent && parentIndex !== null) {
        parent.content.splice(parentIndex, 1, ...repeatableContent); // Replace the parent's content array with the repeatable content
      }
    }

    // If the content has nested content, recursively process it
    if (typeof content === "object" && Array.isArray(content.content)) {
      content.content.forEach((childContent, index) => {
        traverseContent(childContent, content, index); // Pass the current content as the parent
      });
    }
  }

  // Start traversal with the top-level content array
  contentArray.forEach((content, index) => traverseContent(content, null, index));

  return contentArray; // Return the updated content array
};

export { findRepeatableContent, buildRepeatableContent, insertRepeatableContent };
