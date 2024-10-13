<script lang="ts" setup>
import { onMounted, ref } from "vue";

import DataTable from "@/components/shad/DataTable.vue";

import api from "@/api/api";

import { pageTableColumns } from "@/types/columns";
import type { Page } from "../../types/pages";
import { Button } from "@/components/ui/button";

const pages = ref<Page[]>([]);

onMounted(async () => {
  pages.value = (await api.pages.list()).data;
});
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Pages</h1>
      <Button as-child type="default">
        <router-link to="/pages/create" class="btn btn-primary">Create Page</router-link>
      </Button>
    </div>

    <div class="mt-12">
      <DataTable :columns="pageTableColumns" :data="pages" />
    </div>
  </div>
</template>
