<script setup lang="ts">
import { Slider } from "@/components/ui/slider";

import { defineProps, ref } from "vue";

const emit = defineEmits(["update"]);
const props = defineProps({
  defaultValue: {
    type: Array as () => number[],
    required: true,
    default: [0],
  },
  classes: {
    type: Array as () => string[],
    required: true,
  },
});

const localValue = ref(props.defaultValue);

const findClassEquiv = (value: number[] | undefined) => {
  if (!value) return;

  emit("update", props.classes[value[0]]);
};
</script>

<template>
  <Slider :default-value="[0]" :min="0" :max="classes.length - 1" :step="1" @update:model-value="findClassEquiv" v-model:model-value="localValue" />
</template>
