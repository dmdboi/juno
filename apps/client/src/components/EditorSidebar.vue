<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

import PageDetailsTab from "./sidebar/PageDetailsTab.vue";
import AttributesTab from "./sidebar/AttributesTab.vue";
import ElementsTab from "./sidebar/ElementsTab.vue";
import Tabs from "./shad/Tabs.vue";

import { cn } from "@/utils";
import { useElementStore } from "@/stores/elements";

const route = useRoute();
const { currentTab } = storeToRefs(useElementStore());

const tabs = ["elements"];

// Determine if on /pages/new or /pages/:id/edit
if (route.name && ["new-pages", "edit-pages"].includes(route.name!.toString())) {
  tabs.splice(0, 0, "page-details");
}
</script>

<template>
  <div :class="cn('pb-12 h-screen bg-secondary/90', $attrs.class ?? '')">
    <div class="flex justify-center">
      <Tabs v-model="currentTab" :tabs="tabs" />
    </div>

    <div class="px-3 py-2 space-y-4">
      <!-- Elements Tab -->
      <ElementsTab v-if="currentTab === 'elements'" />

      <!-- Attributes Tab -->
      <AttributesTab v-if="currentTab === 'attributes'" />

      <!-- Page Details Tab -->
      <PageDetailsTab v-if="currentTab === 'page-details'" />
    </div>
  </div>
</template>
