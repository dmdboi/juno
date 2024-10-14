<script setup lang="ts">
import EditorSideBar from "../components/EditorSidebar.vue";

import NavigationBar from "@/components/NavigationBar.vue";
</script>

<template>
  <div class="md:hidden">
    <p>This is a mobile device. Please use a desktop device to access the editor.</p>
  </div>
  <div>
    <div class="border-t">
      <!-- Navigation -->
      <NavigationBar />

      <div class="bg-background">
        <div class="grid lg:grid-cols-6">
          <EditorSideBar />
          <div class="col-span-3 lg:col-span-5 lg:border-l">
            <div class="h-full px-4 py-6 lg:px-8">
              <RouterView />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
