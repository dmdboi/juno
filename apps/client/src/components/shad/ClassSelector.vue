<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { ComboboxAnchor, ComboboxContent, ComboboxInput, ComboboxPortal, ComboboxRoot } from "radix-vue";

import { CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from "@/components/ui/tags-input";

import { useElementStore } from "@/stores/elements";

const { selectedElement } = storeToRefs(useElementStore());

const emit = defineEmits(["add", "remove"]);
const props = defineProps<{
  type: string & keyof typeof classes;
}>();

const classes = {
  spacing: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "12", "16", "20", "24", "28", "32", "36", "40", "44", "48", "52", "56", "60", "64", "72", "80", "96"],
  margin: ["m", "mx", "my", "mt", "mr", "mb", "ml", "space-x", "space-y"],
  padding: ["p", "px", "py", "pt", "pr", "pb", "pl"],
  background: ["bg"],
  text: ["text"],
  colors: ["red", "green", "blue", "yellow", "indigo", "purple", "pink", "gray"],
  intensity: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
} as const;

type ClassType = keyof typeof classes;

const buildOptions = (type: ClassType) => {
  const selectedClasses = classes[type];
  const spacingValues = classes.spacing;

  if (type === "margin" || type === "padding") {
    return selectedClasses.flatMap(classType => {
      return spacingValues.map(spacing => {
        return {
          label: `${classType}-${spacing}`,
          value: `${classType}-${spacing}`,
        };
      });
    });
  }

  /** Background classes */
  return selectedClasses.flatMap(classType => {
    return classes.colors.flatMap(color => {
      return classes.intensity.map(intensity => {
        return {
          label: `${classType}-${color}-${intensity}`,
          value: `${classType}-${color}-${intensity}`,
        };
      });
    });
  });
};

const modelValue = ref<string[]>([]);
const open = ref(false);
const searchTerm = ref("");

const filteredClasses = computed(() => {
  if (!searchTerm.value) {
    return buildOptions(props.type);
  }

  return buildOptions(props.type).filter(option => {
    return option.label.toLowerCase().includes(searchTerm.value.toLowerCase());
  });
});

// Watch for changes in the modelValue and emit the new value
function remove(value: string) {
  modelValue.value = modelValue.value.filter(item => item !== value);
  emit("remove", value);
}

onMounted(() => {
  modelValue.value =
    selectedElement.value.attributes && selectedElement.value.attributes.class
      ? selectedElement.value.attributes.class.split(" ").filter((item: string) => buildOptions(props.type).some(option => option.value === item))
      : [];
});
</script>

<template>
  <TagsInput class="gap-0 px-0 w-80" :model-value="modelValue">
    <div class="flex flex-wrap items-center gap-2 px-3">
      <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
        <TagsInputItemText />
        <TagsInputItemDelete @remove="remove(item)" />
      </TagsInputItem>
    </div>

    <ComboboxRoot v-model="modelValue" v-model:open="open" v-model:searchTerm="searchTerm" class="w-full">
      <ComboboxAnchor as-child>
        <ComboboxInput as-child>
          <TagsInputInput class="w-full px-3" :class="modelValue.length > 0 ? 'mt-2' : ''" @keydown.enter.prevent />
        </ComboboxInput>
      </ComboboxAnchor>

      <ComboboxPortal>
        <ComboboxContent>
          <CommandList
            position="popper"
            class="w-[--radix-popper-anchor-width] rounded-md mt-2 border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
            <CommandEmpty />
            <CommandGroup>
              <CommandItem
                v-for="framework in filteredClasses"
                :key="framework.value"
                :value="framework.label"
                @select.prevent="
                  ev => {
                    if (typeof ev.detail.value === 'string') {
                      searchTerm = '';
                      modelValue.push(ev.detail.value);
                      $emit('add', ev.detail.value);
                    }

                    if (filteredClasses.length === 0) {
                      open = false;
                    }
                  }
                ">
                {{ framework.label }}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </ComboboxContent>
      </ComboboxPortal>
    </ComboboxRoot>
  </TagsInput>
</template>
