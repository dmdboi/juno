<script lang="ts" setup>
import { ref, onMounted, watch, defineEmits } from "vue";
import { SaveIcon } from "lucide-vue-next";

// CodeMirror
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";

import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";

// Theme & Beautify
// @ts-ignore
import beautify from "js-beautify";
import { dracula } from "thememirror";
import { Button } from "./ui/button";


const emits = defineEmits(["update:code"]);
const props = defineProps({
  code: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
});

const editor = ref(null as HTMLElement | null);
let view: any = null;

const formatCode = (code: string) => {
  if (props.mode === "html") {
    // Format the initial HTML code using js-beautify
    return beautify.html(code, { indent_size: 2 });
  }

  return code;
};

const getLanguageExtension = (mode: string) => {
  switch (mode) {
    case "javascript":
      return javascript();
    case "html":
      return html();
    case "css":
      return css();
    case "json":
      return json();
    default:
      return javascript();
  }
};

const saveChanges = () => {
  const doc = view.state.doc.toString();
  emits("update:code", doc);
};

onMounted(async () => {
  // Automatically format the HTML string on mount
  const formattedCode = await formatCode(props.code);

  // Create the editor on mount
  const startState = EditorState.create({
    doc: formattedCode,
    extensions: [getLanguageExtension(props.mode), dracula, EditorView.lineWrapping, EditorState.tabSize.of(2)],
  });

  view = new EditorView({
    state: startState,
    parent: editor.value as HTMLElement,
  });
});

watch(
  () => props.code,
  async newCode => {
    // Update the document when the code prop changes
    if (view) {
      const formattedCode = await formatCode(newCode); // Automatically format new code
      const transaction = view.state.update({
        changes: { from: 0, to: view.state.doc.length, insert: formattedCode },
      });
      view.dispatch(transaction);
    }
  }
);

watch(
  () => props.mode,
  newMode => {
    // Update the mode (language) when the mode prop changes
    if (view) {
      const newExtensions = getLanguageExtension(newMode);
      const transaction = view.state.update({
        reconfigure: newExtensions,
      });
      view.dispatch(transaction);
    }
  }
);
</script>

<template>
  <div class="w-full h-11 bg-secondary flex justify-start items-center space-x-1.5 p-2 border border-background rounded-t-lg">
    <div class="">
      <Button variant="dark" @click="saveChanges" class="space-x-2" size="sm"> <SaveIcon class="w-4 h-4" /> <span>Save</span> </Button>
    </div>
  </div>

  <div ref="editor" class="overflow-y-scroll rounded-b-lg overflow-clip max-h-[48rem]"></div>
</template>

<style scoped>
/* Ensure the editor takes up the necessary space */
div {
  height: 100%;
}
</style>
