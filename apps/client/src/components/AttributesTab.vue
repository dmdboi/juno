<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ArrowLeftIcon } from "lucide-vue-next";

import Input from "./shad/Input.vue";
import { Button } from "./ui/button";

import { useElementStore } from "@/stores/elements";

const elementStore = useElementStore();
const { deleteElement } = elementStore;
const { selectedElement, currentTab } = storeToRefs(elementStore);
</script>

<template>
  <div>
    <Button @click="currentTab = 'elements'" class="space-x-2 w-fit" variant="dark">
      <ArrowLeftIcon class="w-4 h-4" />
      <span>Elements</span>
    </Button>
  </div>

  <h2 class="mt-4 mb-2 text-lg font-semibold tracking-tight">Attributes</h2>

  <!-- SelectedElement -->
  <div>
    Editing <strong>{{ selectedElement.type }}</strong>
  </div>

  <div class="mt-8 space-y-4">
    <div class="px-4" v-if="typeof selectedElement.content[0] === 'string'">
      <Input label="Text" v-model="selectedElement.content[0]" />
    </div>

    <div class="px-4">
      <Input label="ID" v-model="selectedElement.id" />
    </div>

    <div class="px-4">
      <Input label="Classes" v-model="selectedElement.attributes!.class" />
    </div>

    <div class="px-4" v-if="selectedElement.type === 'img'">
      <Input label="Source" v-model="selectedElement.attributes!.src" />
    </div>

    <div class="px-4" v-if="selectedElement.type === 'img'">
      <Input label="Alternative Text" v-model="selectedElement.attributes!.alt" />
    </div>

    <div class="px-4" v-if="selectedElement.type === 'a'">
      <Input label="Link" v-model="selectedElement.attributes!.href" />
    </div>

    <div class="px-4" v-if="selectedElement.type === 'a'">
      <Input label="Link Target" v-model="selectedElement.attributes!.target" />
    </div>
  </div>

  <!-- Delete -->
  <div class="mt-4">
    <Button @click="deleteElement" class="w-full" variant="destructive"> Delete Element </Button>
  </div>
</template>
