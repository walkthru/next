---
title: Loading data
file: pages/[slug].js
language: jsx
focus: 72-77
center: 74
---

This tutorial is embedded in a Next.js static site, though you can use any framework you like.

Next has a special method `getStaticProps` for loading data needed by the page at build time. 

This is the perfect place to compile and load the tutorial data. You can do this with the `getData` method of the **WalkThru data module**.

To load the data, you'll need the *tutorial slug* and a *GitHub Personal Access Token*.
