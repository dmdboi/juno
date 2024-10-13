<script setup lang="ts">
import { ref } from "vue";

import { cn } from "@/utils";
import { Button } from "./ui/button";
import { useRouter } from "vue-router";
import { CogIcon } from "lucide-vue-next";

const router = useRouter();

const activeRoute = ref<string>("");

const routes = [
  { name: "Home", path: "/" },
  { name: "Pages", path: "/pages" },
  { name: "Templates", path: "/templates" },
  { name: "Components", path: "/components" },
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
      <div class="px-3 py-2">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-secondary-foreground">Dashboard</h1>

          <div>
            <Button variant="outline" as-child>
              <router-link to="/settings">
                <CogIcon class="w-6 h-6" />
              </router-link>
            </Button>
          </div>
        </div>

        <div class="space-y-1">
          <Button :variant="isActive(route.path) ? 'outline' : 'ghost'" class="justify-start w-full" v-for="route in routes" @click="goTo(route.path)" :key="route.path">
            {{ route.name }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
