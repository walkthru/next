---
title: Slug
file: pages/[slug].js
language: jsx
focus: 68
center: 68
---

To load the data, you'll need the *tutorial slug* and a *GitHub Personal Access Token*.

The "slug" is the unique ID of your walkthru tutorial, e.g. "walkthru-intro" or "my-walkthru-tutorial". This slug will usually be used in the page URL. 

In a Next.js site, we'll use the router software to get this value from the URL. This will be passed into `getStaticProps` as a property of the `params` argument.
