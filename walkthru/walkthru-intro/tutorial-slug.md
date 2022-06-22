---
title: Slug
file: pages/[slug].js
language: jsx
focus: 72
center: 72
---

The tutorial slug is the unique ID of your tutorial, e.g. "walkthru-intro". 

You will probably want to use this slug as a dynamic segment in the URL, e.g. "mysite.com/walthru-intro".

Next.js will pass this to `getStaticProps` as a property of the `params` argument.
