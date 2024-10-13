<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

defineProps<{ title: string }>();
</script>

<template>
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger
        class="p-4 font-semibold text-secondary-foreground bg-secondary"
      >
        {{ title }}
      </AccordionTrigger>
      <AccordionContent class="mt-4">
        <slot />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
