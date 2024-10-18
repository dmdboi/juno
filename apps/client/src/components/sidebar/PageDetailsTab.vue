<script setup lang="ts">
import { storeToRefs } from "pinia";

import Input from "../shad/Input.vue";

import { usePageStore } from "@/stores/pages";
import Textarea from "../shad/Textarea.vue";

const pageStore = usePageStore();
const { page } = storeToRefs(pageStore);

if (!page.value.meta) {
  page.value.meta = {
    title: "",
    description: "",
    image: "",
  };
}
</script>

<template>
  <h2 class="my-4 text-lg font-semibold tracking-tight">Details</h2>

  <Input label="Title" v-model="page.name" />

  <Input label="Ref" v-model="page.ref" />

  <div class="mt-6 space-y-4 border-t border-foreground/20">
    <h2 class="my-4 text-lg font-semibold tracking-tight">Metatags</h2>

    <Input label="Title" v-model="page.meta.title" />

    <Textarea label="Description" v-model="page.meta.description" />

    <Input label="Cover Image URL" v-model="page.meta.image" />
  </div>
</template>
