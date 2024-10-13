<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";
import { defineProps } from "vue";

import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import "highlight.js/styles/atom-one-dark.css";

hljs.registerLanguage("json", json);

const props = defineProps({
  content: {
    type: Object as any,
    required: true,
  },
});

const codeBlock = ref<HTMLElement | null>(null);
const formattedContent = ref<string>("");

const highlightCode = async () => {
  await nextTick();
  if (codeBlock.value) {
    hljs.highlightElement(codeBlock.value);
    hljs.highlightBlock(codeBlock.value);
  }
};

onMounted(() => {
  formattedContent.value = JSON.stringify(props.content, null, 2);

  highlightCode();
});
</script>

<template>
  <div class="overflow-y-scroll border shadow rounded-xl overflow-clip max-h-96">
    <div>
      <pre><code ref="codeBlock" class="json">{{ formattedContent }}</code></pre>
    </div>
  </div>
</template>
