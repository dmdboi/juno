<script setup lang="ts">
import { HomeIcon } from "lucide-vue-next";
</script>

<template>
  <!-- Top Navigation -->
  <div class="border-b border-b-2 bg-secondary/90 text-secondary-foreground">
    <div class="px-6 mx-auto md:px-0">
      <div class="flex items-center justify-between p-4">
        <div class="flex items-center">
          <router-link to="/" class="text-lg font-bold">
            <HomeIcon class="w-6 h-6" />
          </router-link>
        </div>
        <div class="flex items-center"></div>
      </div>
    </div>
  </div>
</template>
