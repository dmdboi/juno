<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { VueDraggable } from "vue-draggable-plus";

import AttributesTab from "./AttributesTab.vue";
import { cn } from "@/utils";
import { useElementStore } from "@/stores/elements";
import { elements } from "@/utils/element";

const { currentTab } = storeToRefs(useElementStore());

const availableItems = ref(elements);
</script>

<template>
  <div :class="cn('pb-12 h-screen  bg-secondary/90', $attrs.class ?? '')">
    <div class="py-4 space-y-4">
      <!-- Elements Tab -->
      <div class="px-3 py-2" v-if="currentTab === 'elements'">
        <h2 class="my-4 text-lg font-semibold tracking-tight">Elements</h2>
        <VueDraggable v-model="availableItems" :group="{ name: 'elements', pull: 'clone', put: false }" item-key="label" class="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div
            v-for="(item, index) in availableItems"
            :key="index"
            class="flex items-center justify-center h-24 bg-white border rounded hover:cursor-pointer text-secondary-foreground">
            <div>
              <component :is="item.icon" class="mx-auto text-2xl" />
              <span class="block mt-1">{{ item.label }}</span>
            </div>
          </div>
        </VueDraggable>
      </div>

      <!-- Attributes Tab -->
      <div class="px-3 py-2" v-if="currentTab === 'attributes'">
        <AttributesTab />
      </div>
    </div>
  </div>
</template>
