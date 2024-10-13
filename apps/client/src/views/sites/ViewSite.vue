<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import Input from "@/components/shad/Input.vue";
import { Button } from "@/components/ui/button";

import api from "@/api/api";
import { useToastStore } from "@/stores/toast";

const router = useRouter();
const toastStore = useToastStore();

const isLoading = ref(true);
const site = ref({} as any);

async function saveSite() {
  try {
    const response = (await api.sites.update(site.value.id, site.value)).data;

    if (!response) {
      throw new Error("Failed to save component");
    }

    toastStore.show("Success", "Site saved successfully", "success");
  } catch (error) {
    console.error(error);
    toastStore.show("Error", "Failed to save Site", "destructive");
  }
}

onMounted(async () => {
  site.value = (await api.sites.get()).data;

  if (!site.value) {
    return router.push("/");
  }

  isLoading.value = false;
});
</script>

<template>
  <div v-if="!isLoading">
    <div class="flex items-center justify-between" v-if="!isLoading">
      <h1 class="text-2xl">Editing <input v-model="site.name" class="p-2 text-2xl font-bold bg-transparent rounded text-secondary-foreground" /></h1>

      <div>
        <Button variant="default" @click="saveSite"> Save </Button>
      </div>
    </div>

    <!-- Meta Tags -->
    <div class="max-w-sm p-4 mt-4 border rounded-xl bg-accent">
      <h2 class="text-xl">Meta Tags</h2>

      <div class="mt-4 space-y-4 ">
        <div>
          <Input label="Title" v-model="site.meta.title" />
        </div>
        <div>
          <Input label="Description" v-model="site.meta.description" />
        </div>
        <div>
          <Input label="Image" v-model="site.meta.image" />
        </div>
        <div>
          <Input label="URL" v-model="site.meta.url" />
        </div>
        <div>
          <Input label="Type" v-model="site.meta.type" />
        </div>
      </div>
    </div>
  </div>
</template>
