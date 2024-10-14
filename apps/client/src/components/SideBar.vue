<script setup lang="ts">
import { ref } from "vue";

import { cn } from "@/utils";
import { Button } from "./ui/button";
import { useRouter } from "vue-router";
import { PanelsTopLeftIcon, SettingsIcon, StickyNoteIcon, ToyBrickIcon } from "lucide-vue-next";

const router = useRouter();

const activeRoute = ref<string>("");

const resouceRoutes = [
  {
    icon: PanelsTopLeftIcon,

    name: "Templates",
    path: "/templates",
  },
  {
    icon: StickyNoteIcon,
    name: "Pages",
    path: "/pages",
  },
  {
    icon: ToyBrickIcon,
    name: "Components",
    path: "/components",
  },
];

const isActive = (route: string) => activeRoute.value.includes(route);

const goTo = (route: string) => {
  activeRoute.value = route;
  router.push(route);
};
</script>

<template>
  <div :class="cn('pb-12 h-screen bg-secondary/40', $attrs.class ?? '')">
    <div class="py-4 space-y-4">
      <!-- Resources -->
      <div class="px-3 py-2">
        <h2 class="px-4 mb-2 text-lg font-semibold tracking-tight">Resources</h2>
        <div class="space-y-1">
          <Button :variant="isActive(route.path) ? 'outline' : 'ghost'" class="justify-start w-full font-semibold" v-for="route in resouceRoutes" :key="route.path" as-child>
            <router-link :to="route.path">
              <component :is="route.icon" class="w-4 h-4 mr-3" />
              <span>{{ route.name }}</span>
            </router-link>
          </Button>
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 py-4">
      <div class="flex items-center justify-between">
        <div>
          <Button variant="outline" as-child> </Button>
        </div>
      </div>
    </div>
  </div>
</template>
