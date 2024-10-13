<script setup lang="ts">
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisIcon, PenIcon, TrashIcon } from "lucide-vue-next";

const props = defineProps<{ id: string; type: string }>();

async function deleteItem() {
  try {
    console.log("Deleting item", props.id);
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <EllipsisIcon class="w-6 h-6 text-secondary-foreground" />
    </DropdownMenuTrigger>
    <DropdownMenuContent class="space-y-2">
      <DropdownMenuLabel>Options</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <router-link :to="{ name: `edit-${type}`, params: { id } }" class="flex items-center w-full">
          <PenIcon class="w-4 h-4 mr-2" />
          <span class="block">Edit</span>
        </router-link>
      </DropdownMenuItem>
      <DropdownMenuItem @click="deleteItem" class="hover:cursor-pointer">
        <TrashIcon class="w-4 h-4 mr-2" />
        <span>Delete</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
