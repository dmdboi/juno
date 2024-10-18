<script setup lang="ts">
import { storeToRefs } from "pinia";

import Input from "../shad/Input.vue";
import { Button } from "../ui/button";

import { useElementStore } from "@/stores/elements";

const elementStore = useElementStore();
const { deleteElement } = elementStore;
const { selectedElement } = storeToRefs(elementStore);
</script>

<template>
  <h2 class="mt-4 mb-2 text-lg font-semibold tracking-tight">Attributes</h2>

  <!-- SelectedElement -->
  <div>
    Editing <strong>{{ selectedElement.type }}</strong>
  </div>

  <div class="mt-8 space-y-4">
    <div v-if="typeof selectedElement.content[0] === 'string'">
      <Input label="Text" v-model="selectedElement.content[0]" />
    </div>

    <div>
      <Input label="ID" v-model="selectedElement.id" />
    </div>

    <div>
      <Input label="Classes" v-model="selectedElement.attributes!.class" />
    </div>

    <div v-if="selectedElement.type === 'img'">
      <Input label="Source" v-model="selectedElement.attributes!.src" />
    </div>

    <div v-if="selectedElement.type === 'img'">
      <Input label="Alternative Text" v-model="selectedElement.attributes!.alt" />
    </div>

    <div v-if="selectedElement.type === 'a'">
      <Input label="Link" v-model="selectedElement.attributes!.href" />
    </div>

    <div v-if="selectedElement.type === 'a'">
      <Input label="Link Target" v-model="selectedElement.attributes!.target" />
    </div>
  </div>

  <!-- Delete -->
  <div class="mt-4">
    <Button @click="deleteElement" class="w-full" variant="destructive"> Delete Element </Button>
  </div>
</template>
