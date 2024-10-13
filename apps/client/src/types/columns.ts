import { h } from "vue";

import type { ColumnDef } from "@tanstack/vue-table";
import type { Component } from "./components";
import TableRowOptionsMenu from "@/components/shad/TableRowOptionsMenu.vue";
import type { Page } from "./pages";

export const componentTableColumns: ColumnDef<Component>[] = [
  {
    accessorKey: "id",
    header: () => h("div", { class: "text-left" }, "Id"),
    cell: ({ row }) => {
      return h("div", { class: "text-left font-medium" }, row.getValue("id"));
    },
  },
  {
    accessorKey: "name",
    header: () => h("div", { class: "text-left" }, "Name"),
    cell: ({ row }) => {
      return h("div", { class: "text-left font-medium" }, row.getValue("name"));
    },
  },
  {
    accessorKey: "ref",
    header: () => h("div", { class: "text-left" }, "Ref"),
    cell: ({ row }) => {
      return h("div", { class: "text-left font-medium" }, row.getValue("ref"));
    },
  },
  {
    accessorKey: "id",
    header: () => h("div", { class: "text-right" }, "Actions"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "relative flex justify-end" },
        h(TableRowOptionsMenu, {
          id: row.getValue("id") as string,
          type: "component",
        })
      );
    },
  },
];

export const pageTableColumns: ColumnDef<Page>[] = [
  {
    accessorKey: "id",
    header: () => h("div", { class: "text-left" }, "Id"),
    cell: ({ row }) => {
      return h("div", { class: "text-left font-medium" }, row.getValue("id"));
    },
  },
  {
    accessorKey: "name",
    header: () => h("div", { class: "text-left" }, "Name"),
    cell: ({ row }) => {
      return h("div", { class: "text-left font-medium" }, row.getValue("name"));
    },
  },
  {
    accessorKey: "ref",
    header: () => h("div", { class: "text-left" }, "Ref"),
    cell: ({ row }) => {
      return h("div", { class: "text-left font-medium" }, row.getValue("ref"));
    },
  },
  {
    accessorKey: "id",
    header: () => h("div", { class: "text-right" }, "Actions"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "relative flex justify-end" },
        h(TableRowOptionsMenu, {
          id: row.getValue("id") as string,
          type: "pages",
        })
      );
    },
  },
];
