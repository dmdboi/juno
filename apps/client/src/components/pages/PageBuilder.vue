<script setup lang="ts">
import { ref, type PropType } from "vue";
import { SaveIcon } from "lucide-vue-next";
import { VueDraggable } from "vue-draggable-plus";

import Button from "../ui/button/Button.vue";
import NestedRenderer from "./NestedRenderer.vue";

const emits = defineEmits(["update:code"]);
const props = defineProps({
  code: {
    type: Array as PropType<any[]>,
    required: true,
  },
});

const localValue = ref(props.code);

const saveChanges = () => {
  emits("update:code", localValue.value);
};

const updateElement = (index: number, updatedElement: any) => {
  localValue.value[index] = updatedElement;
};
</script>

<template>
  <div class="flex flex-row w-full">
    <!-- Dropzone where HTML gets built -->
    <div class="w-full">
      <div class="w-full bg-secondary flex justify-start items-center space-x-1.5 p-2 border rounded-t-lg">
        <div class="">
          <Button variant="dark" @click="saveChanges" class="space-x-2" size="sm"> <SaveIcon class="w-4 h-4" /> <span>Save</span> </Button>
        </div>
      </div>

      <VueDraggable
        v-model="localValue"
        :group="{
          name: 'elements',
          pull: 'clone',
          put: e => {
            console.log('Put', e);
            return true;
          },
        }"
        item-key="label"
        class="min-h-full p-4 text-black bg-white border-b rounded-b-lg border-x">
        <template v-for="(element, index) in localValue" :key="index">
          <!-- Pass the element as prop and handle updates via @update -->
          <NestedRenderer :element="element" @update:element="updateElement(index, $event)" :isComponent="element.is_component" :isParent="true" />
        </template>
      </VueDraggable>
    </div>
  </div>
</template>

<style scoped>
.builder-container {
  display: flex;
}

.draggable-list {
  width: 30%;
  padding: 10px;
  background-color: #f0f0f0;
  border-right: 1px solid #ddd;
}

.dropzone {
  width: 70%;
  padding: 20px;
}

.dropzone h3 {
  margin-top: 0;
  text-align: center;
}
</style>
