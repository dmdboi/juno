<template>
  <component :is="element.type" v-if="isContainerElement" :class="element.attributes?.class">
    <!-- Render each child element -->
    <template v-for="(childElement, index) in element.content" :key="index">
      <!-- If string, just render string -->
      <p v-if="typeof childElement === 'string'">{{ childElement }}</p>

      <ReadOnlyRenderer v-else-if="childElement.content && childElement.content.length > 0" :element="childElement" />
      <!-- Render leaf elements -->
      <component
        @click.self="selectElement(childElement)"
        v-else
        :is="childElement.type"
        :id="childElement.attributes?.id"
        :class="childElement.attributes?.class"
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

  <!-- Leaf elements like img, a, etc. -->
  <component
    v-else
    :is="element.type"
    :id="element.attributes?.id"
    :class="element.attributes?.class"
    :style="element.attributes?.style"
    :src="element.attributes?.src"
    :alt="element.attributes?.alt">
    <template v-if="typeof element.content[0] === 'string'">
      {{ element.content[0] }}
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

import type { ElementType } from "@/types";
import { useElementStore } from "@/stores/elements";

interface Props {
  element: ElementType;
}

const { selectElement } = useElementStore();

const props = defineProps<Props>();

// Check if the element is a container type
const isContainerElement = computed(() => {
  const containerTags = ["div", "section", "ul", "ol", "nav", "header", "footer", "li", "main"];
  return containerTags.includes(props.element.type) && Array.isArray(props.element.content);
});
</script>
