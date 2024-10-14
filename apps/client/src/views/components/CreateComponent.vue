<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
// @ts-ignore
import { HTMLToJSON } from "html-to-json-parser";

import ComponentBuilder from "@/components/components/ComponentBuilder.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import { Button } from "@/components/ui/button";
import Tabs from "@/components/shad/Tabs.vue";

import api from "@/api/api";
import { useComponentStore } from "@/stores/components";
import { useToastStore } from "@/stores/toast";

const componentStore = useComponentStore();
const { component } = storeToRefs(componentStore);
const toastStore = useToastStore();

const isLoading = ref(true);
const currentTab = ref("Editor");

const html = ref("");

async function createComponent() {
  try {
    const response = (await api.components.create(component.value)).data;

    if (!response) {
      throw new Error("Failed to create component");
    }

    componentStore.setComponent(response);
    html.value = await componentStore.getContentInHTML();

    toastStore.show("Success", "Component created successfully", "success");
  } catch (error) {
    console.error(error);
    toastStore.show("Error", "Failed to create component", "destructive");
  }
}

/** Called from CodeEditor when HTML code is saved */
async function handleHTMLUpdate(code: string) {
  try {
    // Remove all newlines and whitespace
    const cleanedCode = code.replace(/\n/g, "").replace(/\s\s+/g, "");

    const json = await HTMLToJSON(cleanedCode);

    if (!json) {
      throw new Error("Failed to parse HTML");
    }

    componentStore.updateComponentProperty("content", [json]);
    html.value = code;

    toastStore.show("Success", "HTML updated successfully");
  } catch (error) {
    console.error(error);
    toastStore.show("Error", "Failed to update HTML", "destructive");
  }
}

/** Called from CodeEditor when JSON code is saved */
function handleJSONUpdate(code: any) {
  try {
    const json = JSON.parse(code);

    componentStore.updateComponentProperty("content", json);

    toastStore.show("Success", "JSON updated successfully");
  } catch (error) {
    console.error(error);
    toastStore.show("Error", "Failed to update JSON", "destructive");
  }
}

function handleUpdate(code: any) {
  try {
    componentStore.updateComponentProperty("content", code);

    toastStore.show("Success", "Builder updated successfully");
  } catch (error) {
    console.error(error);
    toastStore.show("Error", "Failed to update Builder", "destructive");
  }
}

onMounted(async () => {
  isLoading.value = true;

  await componentStore.setComponent({
    name: "New Component",
    content: [
      {
        type: "div",
        content: [
          {
            type: "h1",
            content: ["Hello, World!"],
          },
          {
            type: "p",
            content: ["This is a new component"],
          },
        ],
      },
    ],
  });
  html.value = await componentStore.getContentInHTML();

  isLoading.value = false;
});
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <h1 class="text-2xl">Creating <input v-model="component.name" class="p-2 text-2xl font-bold bg-transparent rounded text-secondary-foreground" /></h1>

      <div>
        <Button variant="default" @click="createComponent"> Publish </Button>
      </div>
    </div>

    <div class="mt-12" v-if="isLoading">
      <p>Loading...</p>
    </div>

    <div class="mt-12" v-if="!isLoading">
      <!-- Tabs -->
      <Tabs :tabs="['Editor', 'JSON', 'HTML']" v-model="currentTab" />

      <div class="mt-4">
        <ComponentBuilder v-if="currentTab === 'Editor'" :code="component.content" @update:code="handleUpdate" />

        <div v-if="currentTab === 'JSON'">
          <CodeEditor :code="JSON.stringify(component.content, null, 2)" mode="json" @update:code="handleJSONUpdate" />
        </div>

        <div v-if="currentTab === 'HTML'">
          <CodeEditor :code="html" mode="html" @update:code="handleHTMLUpdate" />
        </div>
      </div>
    </div>
  </div>
</template>
