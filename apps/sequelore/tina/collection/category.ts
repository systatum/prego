import type { Collection } from "tinacms";

const Category: Collection = {
  label: "Category",
  name: "category",
  path: "content/category",
  format: "md",
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
      isTitle: true,
      required: true,
    },
  ],
};
export default Category;
