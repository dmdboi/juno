<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { VueDraggable } from "vue-draggable-plus";

import type { ElementType } from "@/types";
import { useElementStore } from "@/stores/elements";

interface Props {
  element: ElementType;
  isComponent?: boolean;
  isParent?: {
    type: Boolean;
    default: false;
  };
}

const elementStore = useElementStore();
const { selectElement } = elementStore;
const { selectedElement } = storeToRefs(useElementStore());

const props = defineProps<Props>();
const emits = defineEmits(["update:element"]);

// Computed property to handle v-model-like reactivity
const elementContent = computed({
  get: () => props.element.content,
  set: value => emits("update:element", { ...props.element, content: value }),
});

// Check if the element is a container type
const isContainerElement = computed(() => {
  const containerTags = ["div", "section", "ul", "ol", "nav", "header", "footer", "li", "main", "body"];
  return containerTags.includes(props.element.type) && Array.isArray(props.element.content);
});

// Function to emit updates for child elements
const updateChild = (index: number, updatedElement: ElementType) => {
  const updatedContent = [...elementContent.value];
  updatedContent[index] = updatedElement;
  elementContent.value = updatedContent;
};
</script>

<template>
  <!-- Draggable wrapper for container elements like div/section -->
  <VueDraggable
    v-if="isContainerElement && !isComponent"
    :class="[element.attributes?.class]"
    :tag="element.type"
    v-model="element.content"
    group="elements"
    @click.self="selectElement(element)">
    <!-- Render each child element -->
    <template v-for="(childElement, index) in element.content" :key="index">
      <!-- If string, just render string -->
      <p v-if="typeof childElement === 'string'">{{ childElement }}</p>

      <!-- Nested renderer with the same component behavior passed down -->
      <nested-renderer
        v-else-if="childElement.content && childElement.content.length > 0"
        :element="childElement"
        @update:element="updateChild(index, $event)"
        :isComponent="element.is_component" />

      <!-- Leaf elements (conditionally interactive) -->
      <component
        v-else
        @click.self="!element.is_component && selectElement(childElement)"
        :is="childElement.type"
        :id="childElement.attributes?.id"
        :class="[element.attributes?.class, 'component', selectedElement === element ? 'border-2 border-blue-500' : '']"
        :style="childElement.attributes?.style"
        :src="childElement.attributes?.src"
        :alt="childElement.attributes?.alt">
        <template v-if="childElement.type === 'a' || typeof childElement.content === 'string'">
          <a v-if="childElement.type === 'a'" :href="childElement.attributes?.href">{{ childElement.content[0] }}</a>
          <p v-else>{{ childElement.content[0] }}</p>
        </template>
      </component>
    </template>
  </VueDraggable>

  <!-- Non-draggable, non-interactive rendering for is_component or passed-in isComponent -->
  <component
    v-else-if="isContainerElement && isComponent"
    :is="element.type"
    :class="[element.attributes?.class, isParent ? 'border-2 border-blue-500' : '']"
    v-model="element.content">
    <template v-for="(childElement, index) in element.content" :key="index">
      <!-- If string, just render string -->
      <p v-if="typeof childElement === 'string'">{{ childElement }}</p>

      <!-- Nested renderer (non-interactive for child elements as well) -->
      <nested-renderer v-else-if="childElement.content && childElement.content.length > 0" :element="childElement" :isComponent="true" />

      <!-- Non-interactive leaf elements -->
      <component
        v-else
        :is="childElement.type"
        :id="childElement.attributes?.id"
        :class="[element.attributes?.class]"
        :style="childElement.attributes?.style"
        :src="childElement.attributes?.src"
        :alt="childElement.attributes?.alt">
        <template v-if="childElement.type === 'a' || typeof childElement.content === 'string'">
          <a v-if="childElement.type === 'a'" :href="childElement.attributes?.href">{{ childElement.content[0] }}</a>
          <p v-else>{{ childElement.content[0] }}</p>
        </template>
      </component>
    </template>
  </component>

  <!-- Leaf elements (conditionally interactive) -->
  <component
    @click.self="selectElement(element)"
    v-if="!isContainerElement && !isComponent"
    :is="element.type"
    :id="element.attributes?.id"
    :class="[element.attributes?.class, 'component', selectedElement === element ? 'border-2 border-blue-500' : '']"
    :style="element.attributes?.style"
    :src="element.attributes?.src"
    :alt="element.attributes?.alt">
    <!-- String Content for Anchor or Paragraph -->
    <template v-if="typeof element.content[0] === 'string'">
      {{ element.content[0] }}
    </template>
  </component>

  <!-- Non-interactive leaf elements for is_component or passed-in isComponent -->
  <component
    :class="[element.attributes?.class, isParent ? 'border-2 border-blue-500' : '']"
    v-if="!isContainerElement && isComponent"
    :is="element.type"
    :id="element.attributes?.id"
    :style="element.attributes?.style"
    :src="element.attributes?.src"
    :alt="element.attributes?.alt">
    <!-- String Content for Anchor or Paragraph -->
    <template v-if="typeof element.content[0] === 'string'">
      {{ element.content[0] }}
    </template>
  </component>
</template>

<style scoped>
/* Add hover effect for other components like image, anchor, or paragraphs */
.component:not(.border-blue-500):hover {
  border: 1px dashed #ccc;
  cursor: pointer;
}

/* Ensure nested hover won't trigger parent border */
.component .component:not(.border-blue-500):hover {
  border: none;
}
</style>
