type Content = string | ContentBody; // Content can be a string or an object
type ContentBody = {
  type: string;
  ref?: string;
  content?: Content[];
};

const replaceComponentsInPageRequest = (content: any): any => {
  function traverseContent(content: any): any {
    // If the content is an array, traverse each element and flatten nested arrays
    if (Array.isArray(content)) {
      // We ensure that each item in the array is an object
      return content.map(traverseContent).flat();
    }

    // If the content is a string, return it as is
    if (typeof content === "string") {
      return content;
    }

    // If the content is an object and has the is_component key, replace it
    if (typeof content === "object" && content.is_component) {
      return {
        type: "component",
        ref: content.ref,
      };
    }

    // If the content is an object and has a content key, recursively traverse the content array
    if (typeof content === "object" && Array.isArray(content.content)) {
      return {
        ...content,
        content: traverseContent(content.content), // Flatten inner arrays
      };
    }

    return content; // return any other object unchanged
  }

  return traverseContent(content); // Start the recursion from the root content
};

/**
 * Recursively find all components in a content array and return them in an array for further processing.
 * @param data
 * @returns
 */
const getComponentsInTemplate = async (
  content: Array<ContentBody>
): Promise<{
  message: string;
  components?: any[];
}> => {
  let components: any[] = [];

  function traverseContent(content: string | ContentBody) {
    if (typeof content === "string") return;

    if (typeof content === "object" && content.type === "component") {
      components.push(content);
    }

    if (typeof content === "object" && Array.isArray(content.content)) {
      content.content.forEach(traverseContent);
    }
  }

  // Start traversal with the top-level content array
  if (Array.isArray(content)) {
    content.forEach(traverseContent);
  }

  return {
    message: "Success",
    components,
  };
};

/**
 * Replace component references in a page with the actual component data.
 * @param data
 * @param components
 * @returns
 */
const restoreComponentsInPageRequest = (content: any[], components: any[]) => {
  function traverseContent(content: any): any {
    // If the content is an array, traverse each element
    if (Array.isArray(content)) {
      return content.map(traverseContent);
    }

    // If the content is a string, return it as is
    if (typeof content === "string") {
      return content;
    }

    // If the content is an object and is a component placeholder, find the corresponding component
    if (typeof content === "object" && content.type === "component" && content.ref) {
      const foundComponent = components.find(component => component.ref === content.ref);
      if (foundComponent) {
        return foundComponent.content[0]; // Replace with the actual component
      }
    }

    // If the content is an object and has a content key, recursively traverse the content array
    if (typeof content === "object" && Array.isArray(content.content)) {
      return {
        ...content,
        content: traverseContent(content.content), // Recursively handle content arrays
      };
    }

    return content; // return any other object unchanged
  }

  return traverseContent(content); // Start the recursion from the root content
};

export { replaceComponentsInPageRequest, getComponentsInTemplate, restoreComponentsInPageRequest };
