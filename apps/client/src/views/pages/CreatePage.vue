<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

import PageBuilder from "@/components/pages/PageBuilder.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import { Button } from "@/components/ui/button";
import Tabs from "@/components/shad/Tabs.vue";

import api from "@/api/api";
import { useToastStore } from "@/stores/toast";
import { usePageStore } from "@/stores/pages";

const pageStore = usePageStore();
const { page } = storeToRefs(pageStore);
const toastStore = useToastStore();

const isLoading = ref(true);
const currentTab = ref("Editor");

const html = ref("");

async function createPage() {
  try {
    const response = (await api.pages.create(page.value)).data;

    if (!response) {
      throw new Error("Failed to create page");
    }

    pageStore.setPage(response);
    html.value = await pageStore.getContentInHTML();

    toastStore.show("Success", "Page created successfully", "success");
  } catch (error) {
    console.error(error);
    toastStore.show("Error", "Failed to create page", "destructive");
  }
}

/** Called from CodeEditor when JSON code is saved */
function handleJSONUpdate(code: any) {
  try {
    const json = JSON.parse(code);

    pageStore.updatePageProperty("content", json);

    toastStore.show("Success", "JSON updated successfully");
  } catch (error) {
    console.error(error);
    toastStore.show("Error", "Failed to update JSON", "destructive");
  }
}

function handleUpdate(code: any) {
  try {
    pageStore.updatePageProperty("content", code);

    toastStore.show("Success", "Builder updated successfully");
  } catch (error) {
    console.error(error);
    toastStore.show("Error", "Failed to update Builder", "destructive");
  }
}

onMounted(async () => {
  isLoading.value = true;

  await pageStore.setPage({
    name: "New Page",
    content: [
      {
        type: "main",
        content: [
          {
            type: "section",
            content: [
              {
                type: "h1",
                content: ["Hello World"],
              },
              {
                type: "p",
                content: ["This is a paragraph"],
              },
            ],
          },
        ],
      },
    ],
    ref: "new-page",
    meta: {
      title: "New Page",
      description: "This is a new page",
      image: "",
    },
  });
  html.value = await pageStore.getContentInHTML();

  isLoading.value = false;
});
</script>

<template>
  <div>
    <div class="flex items-center justify-between" v-if="!isLoading">
      <h1 class="text-2xl">Creating <input v-model="page.name" class="p-2 text-2xl font-bold bg-transparent rounded text-secondary-foreground" /></h1>

      <div>
        <Button variant="default" @click="createPage"> Publish </Button>
      </div>
    </div>

    <div class="mt-12" v-if="isLoading">
      <p>Loading...</p>
    </div>

    <div class="mt-12" v-if="!isLoading">
      <!-- Tabs -->
      <Tabs :tabs="['Editor', 'JSON']" v-model="currentTab" />

      <div class="mt-4">
        <PageBuilder v-if="currentTab === 'Editor'" :code="page.content" @update:code="handleUpdate" />

        <div v-if="currentTab === 'JSON'">
          <CodeEditor :code="JSON.stringify(page.content, null, 2)" mode="json" @update:code="handleJSONUpdate" />
        </div>
      </div>
    </div>
  </div>
</template>
