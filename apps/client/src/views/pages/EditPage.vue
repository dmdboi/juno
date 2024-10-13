<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import PageBuilder from "@/components/pages/PageBuilder.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import { Button } from "@/components/ui/button";
import Tabs from "@/components/shad/Tabs.vue";

import api from "@/api/api";
import router from "@/router";
import { useToastStore } from "@/stores/toast";
import { usePageStore } from "@/stores/pages";

const route = useRoute();
const pageStore = usePageStore();
const { page } = storeToRefs(pageStore);
const toastStore = useToastStore();

const isLoading = ref(true);
const currentTab = ref("Editor");

const html = ref("");

async function savePage() {
  try {
    const response = (await api.pages.update(route.params.id as string, page.value)).data;

    if (!response) {
      throw new Error("Failed to save component");
    }

    pageStore.setPage(response);
    html.value = await pageStore.getContentInHTML();

    toastStore.show("Success", "Page saved successfully", "success");
  } catch (error) {
    console.error(error);
    toastStore.show("Error", "Failed to save page", "destructive");
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

  const response = (await api.pages.get(route.params.id as string)).data;

  if (!response) {
    return router.push("/pages");
  }

  console.log(response);

  await pageStore.setPage(response);
  html.value = await pageStore.getContentInHTML();

  isLoading.value = false;
});
</script>

<template>
  <div>
    <div class="flex items-center justify-between" v-if="!isLoading">
      <h1 class="text-2xl">Editing <input v-model="page.name" class="p-2 text-2xl font-bold bg-transparent rounded text-secondary-foreground" /></h1>

      <div>
        <Button variant="default" @click="savePage"> Publish </Button>
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
