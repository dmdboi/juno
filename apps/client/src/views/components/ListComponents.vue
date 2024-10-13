<script lang="ts" setup>
import { onMounted, ref } from "vue";

import DataTable from "@/components/shad/DataTable.vue";

import api from "@/api/api";

import { componentTableColumns } from "@/types/columns";
import type { Component } from "@/types/components";

const components = ref<Component[]>([]);

onMounted(async () => {
  components.value = (await api.components.list()).data;
});
</script>

<template>
  <div>
    <h1 class="text-2xl">Components</h1>

    <div class="mt-12">
      <DataTable :columns="componentTableColumns" :data="components" />
    </div>
  </div>
</template>
