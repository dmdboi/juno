<script setup lang="ts">
import { defineProps, defineEmits, ref, watchEffect } from "vue";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

defineEmits(["update:modelValue"]);
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
    default: "",
  },
});

const localValue = ref(props.modelValue);

watchEffect(() => {
  localValue.value = props.modelValue;
});
</script>

<template>
  <div class="items-center w-full">
    <Label :for="label" v-if="label">{{ label }}</Label>
    <Input :id="label" v-model="localValue" class="w-full mt-1" @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>
