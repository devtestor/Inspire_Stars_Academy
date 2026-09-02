import { defineField, defineType } from "sanity";

export const newsPost = defineType({
  name: "newsPost",
  title: "News post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "category", title: "Category", type: "string", options: { list: ["Academy News", "Tournament Reports", "Athlete Stories", "International Opportunities", "Training Camps", "Community Impact"] }, validation: (rule) => rule.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3, validation: (rule) => rule.required().max(220) }),
    defineField({ name: "body", title: "Story", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "coverImage", title: "Cover image", type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Alt text", type: "string", validation: (rule) => rule.required() }] }),
    defineField({ name: "publishedAt", title: "Publish date", type: "datetime", initialValue: () => new Date().toISOString(), validation: (rule) => rule.required() }),
    defineField({ name: "featured", title: "Feature on homepage", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "title", media: "coverImage", subtitle: "category" } },
});

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery image",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Alt text", type: "string", validation: (rule) => rule.required() }] }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({ name: "publishedAt", title: "Publish date", type: "datetime", initialValue: () => new Date().toISOString() }),
  ],
  preview: { select: { title: "title", media: "image" } },
});

export const schemaTypes = [newsPost, galleryImage];
