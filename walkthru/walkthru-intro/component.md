---
title: WalkThru component
language: jsx
file: pages/[slug].js
focus: 38-45
center: 42
---

Returning to the WalkThru component, the `data` prop should be assigned the data returned from `getData` in the previous step.

You'll also need two other props: `tutorialSlug` and `stepSlug`. These are the slugs of the current tutorial and the current step respectively.

The way you get these will be dependent on your implementation. For this site, I've made the `tutorialSlug` a dynamic route component while the `stepSlug` is a URL hash value.

You can also pass an object to the `classes` prop which will contain CSS class names that can be applied to sub-elements within the component.
