<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const props = defineProps<{
  tabs: string[];
  modelValue: string;
}>();
</script>

<template>
  <Tabs :default-value="tabs[0]" :model-value="modelValue">
    <TabsList>
      <TabsTrigger :value="tab" v-for="tab in props.tabs" @click="() => $emit('update:modelValue', tab)" :key="tab">
        {{ tab.replace(/-/g, ' ') }}  
      </TabsTrigger>
    </TabsList>
    <TabsContent v-for="tab in props.tabs" :key="tab" :value="tab">
      <slot :name="tab" />
    </TabsContent>
  </Tabs>
</template>
