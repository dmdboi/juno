<script lang="ts" setup>
import ReadOnlyRenderer from "./ReadOnlyRenderer.vue";

const props = defineProps({
  content: {
    type: Object as any,
    required: true,
  },
});
</script>

<template>
  <div class="border shadow rounded-xl overflow-clip">
    <div class="w-full h-11 rounded-t-lg border-2 border-gray-200 bg-gray-200 flex justify-start items-center space-x-1.5 px-3">
      <span class="w-3 h-3 bg-red-500 rounded-full"></span>
      <span class="w-3 h-3 bg-orange-500 rounded-full"></span>
      <span class="w-3 h-3 bg-green-500 rounded-full"></span>
    </div>

    <div class="p-4 py-6 text-black bg-white border-t border-gray-300">
      <template v-for="(element, index) in props.content" :key="index">
        <!-- Pass the element as prop and handle updates via @update -->
        <ReadOnlyRenderer :element="element" />
      </template>
    </div>
  </div>
</template>
