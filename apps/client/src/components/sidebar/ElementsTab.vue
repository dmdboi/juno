<script setup lang="ts">
import { ref } from "vue";
import { VueDraggable } from "vue-draggable-plus";

import { elements } from "@/utils/element";
import { Card } from "../ui/card";

const availableItems = ref(elements);
</script>

<template>
  <h2 class="my-4 text-lg font-semibold tracking-tight">Elements</h2>
  <VueDraggable v-model="availableItems" :group="{ name: 'elements', pull: 'clone', put: false }" item-key="label" class="grid grid-cols-1 gap-2 md:grid-cols-2">
    <Card v-for="(item, index) in availableItems" :key="index">
      <div class="flex items-center justify-center w-full h-24 hover:cursor-pointer">
        <div>
          <component :is="item.icon" class="mx-auto text-2xl" />
          <span class="block mt-1">{{ item.label }}</span>
        </div>
      </div>
    </Card>
  </VueDraggable>
</template>
