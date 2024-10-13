<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { VueDraggable } from "vue-draggable-plus";
import { ArrowLeftIcon } from "lucide-vue-next";

import AttributesTab from "./AttributesTab.vue";
import { Button } from "./ui/button";

import { cn } from "@/utils";
import { useElementStore } from "@/stores/elements";

const { currentTab } = storeToRefs(useElementStore());

const availableItems = ref([
  {
    type: "p",
    label: "Paragraph",
    content: ["New Paragraph"],
    attributes: {
      class: "text-lg",
    },
  },
  { type: "div", label: "Section", content: ["New Div"] },
  { type: "h1", label: "Heading", content: ["New Heading"] },
  {
    label: "Navbar",
    type: "nav",
    content: [
      {
        type: "ul",
        attributes: {
          class: "flex space-x-4",
        },
        content: [
          {
            type: "li",
            content: [
              {
                type: "a",
                content: ["Home"],
                attributes: { href: "/" },
              },
            ],
          },
          {
            type: "li",
            content: [
              {
                type: "a",
                content: ["About"],
                attributes: { href: "/about", class: "text-blue-500" },
              },
            ],
          },
          { type: "li", content: [{ type: "a", content: ["Contact"], attributes: { href: "/contact" } }] },
        ],
      },
    ],
  },
  {
    label: "Image",
    type: "img",
    content: [],
    attributes: {
      src: "https://via.placeholder.com/150",
      alt: "Placeholder Image",
    },
  },
  {
    label: "Button",
    type: "button",
    content: ["Click Me"],
    attributes: {
      class: "bg-blue-500 text-white px-4 py-2 rounded",
    },
  },
  {
    label: "Grid",
    type: "div",
    content: [
      {
        type: "div",
        attributes: {
          class: "grid grid-cols-2 gap-4 w-full",
          id: "grid",
        },
        content: [
          {
            type: "div",
            attributes: {
              class: "col-span-1",
              id: "col1",
            },
            content: [
              {
                type: "h1",
                content: ["Heading 1"],
              },
              {
                type: "p",
                content: ["Item 1"],
              },
            ],
          },
          {
            type: "div",
            attributes: {
              class: "col-span-1",
              id: "col2",
            },
            content: [
              {
                type: "h1",
                content: ["Heading 2"],
              },
              {
                type: "p",
                content: ["Item 2"],
              },
            ],
          },
        ],
      },
    ],
  },
]);
</script>

<template>
  <div :class="cn('pb-12 h-screen  bg-secondary/90', $attrs.class ?? '')">
    <div class="py-4 space-y-4">
      <!-- Elements Tab -->
      <div class="px-3 py-2" v-if="currentTab === 'elements'">
        <Button @click="currentTab = 'elements'" class="space-x-2 w-fit" variant="dark" as-child>
          <router-link to="/components" class="flex items-center space-x-2">
            <ArrowLeftIcon class="w-4 h-4" />
            <span>Home</span>
          </router-link>
        </Button>

        <h2 class="my-4 text-lg font-semibold tracking-tight">Elements</h2>
        <VueDraggable v-model="availableItems" :group="{ name: 'elements', pull: 'clone', put: false }" item-key="label" class="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div v-for="(item, index) in availableItems" :key="index" class="flex items-center justify-center h-24 border bg-secondary text-secondary-foreground rounded-2xl">
            <div>{{ item.label }}</div>
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
