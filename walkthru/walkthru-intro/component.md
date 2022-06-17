---
title: Walkthru component
language: jsx
file: pages/[slug].js
focus: 32-42
center: 37
---

Returning to the Walkthru component, the `code`,  `instructions`, and `config` props should be populated with the data returned from `getData` in the previous step.

You'll also need two other props: `tutorialSlug` and `stepSlug`. These are the slugs of the current walkthru tutorial and the current step respectively.

The way you get these will be dependent on your implementation. For this site, we've made the tutorialSlug a dynamic route component while the `stepSlug` is a hash value.
