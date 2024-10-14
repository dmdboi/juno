<script setup lang="ts">
import Sidebar from "../components/SideBar.vue";
import NavigationBar from "@/components/NavigationBar.vue";
</script>

<template>
  <div class="md:hidden"></div>
  <div>
    <div class="border-t">
      <div class="bg-background">
        <!-- Navigation -->
        <NavigationBar />

        <div class="grid lg:grid-cols-6">
          <Sidebar class="hidden lg:block" />
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
