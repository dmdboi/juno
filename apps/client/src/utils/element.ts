import { CompassIcon, Heading1Icon, ImageIcon, LayoutGridIcon, MousePointerClickIcon, SquareDashedIcon, TableIcon, TextIcon } from "lucide-vue-next";

// Elements present in the EditorSidebar component
export const elements = [
  {
    icon: Heading1Icon,
    type: "h1",
    label: "Heading",
    content: ["New Heading"],
    attributes: { class: "text-2xl" },
  },
  {
    icon: TextIcon,
    type: "p",
    label: "Paragraph",
    content: ["New Paragraph"],
    attributes: {
      class: "text-lg",
    },
  },
  {
    icon: SquareDashedIcon,
    type: "section",
    label: "Section",
    content: [
      {
        type: "h1",
        content: ["Section Heading"],
      },
      {
        type: "p",
        content: ["Section Content"],
      },
    ],
  },
  {
    icon: CompassIcon,
    label: "Navbar",
    type: "nav",
    content: [
      {
        type: "ul",
        attributes: {
          class: "flex space-x-4",
        },
        content: [
          {
            type: "li",
            content: [
              {
                type: "a",
                content: ["Home"],
                attributes: { href: "/", class: "text-blue-500" },
              },
            ],
          },
          {
            type: "li",
            content: [
              {
                type: "a",
                content: ["About"],
                attributes: { href: "/about", class: "text-blue-500" },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    icon: ImageIcon,
    label: "Image",
    type: "img",
    content: [],
    attributes: {
      src: "https://via.placeholder.com/150",
      alt: "Placeholder Image",
    },
  },
  {
    icon: MousePointerClickIcon,
    label: "Button",
    type: "button",
    content: ["Click Me"],
    attributes: {
      class: "bg-blue-500 text-white px-4 py-2 rounded",
    },
  },
  {
    icon: LayoutGridIcon,
    label: "Grid",
    type: "div",
    content: [
      {
        type: "div",
        attributes: {
          class: "grid grid-cols-2 gap-4 w-full",
          id: "grid",
        },
        content: [
          {
            type: "div",
            attributes: {
              class: "col-span-1",
              id: "col1",
            },
            content: [
              {
                type: "h1",
                content: ["Column 1"],
              },
              {
                type: "p",
                content: ["Item 1"],
              },
            ],
          },
          {
            type: "div",
            attributes: {
              class: "col-span-1",
              id: "col2",
            },
            content: [
              {
                type: "h1",
                content: ["Column 2"],
              },
              {
                type: "p",
                content: ["Item 2"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    icon: TableIcon,
    label: "Table",
    type: "table",
    content: [
      {
        type: "thead",
        content: [
          {
            type: "tr",
            content: [
              {
                type: "th",
                content: ["Name"],
              },
              {
                type: "th",
                content: ["Age"],
              },
            ],
          },
        ],
      },
      {
        type: "tbody",
        content: [
          {
            type: "tr",
            content: [
              {
                type: "td",
                content: ["John Doe"],
              },
              {
                type: "td",
                content: ["30"],
              },
            ],
          },
          {
            type: "tr",
            content: [
              {
                type: "td",
                content: ["Jane Doe"],
              },
              {
                type: "td",
                content: ["25"],
              },
            ],
          },
        ],
      },
    ],
    attributes: {
      class: "border-collapse border border-gray-400",
    },
  },
];
