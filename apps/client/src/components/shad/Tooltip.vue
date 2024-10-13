<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

defineProps({
  message: String,
});
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <slot />
      </TooltipTrigger>
      <TooltipContent>
        <p>
          {{ message }}
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
