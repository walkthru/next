---
title: Static paths
file: 'pages/[slug].js'
focus: 53-65
center: 59
---

Since we're using a dynamic path e.g. *myapp.com/:tutorial#step* and we're generating a static site with pre-rendered pages, we need to tell the app which paths are valid.

Remember, each tutorial has it's own directory in the file system e.g. /walkthrough/:tutorial.

In Next.js, `getStaticPaths` is the hook used to return the list of dynamic routes of your app. This runs at build time on Node, so let's use the `fs.readdirSync` file system package to return all of the files and directories in the `walkthru` folder.

We filter the returned array to ensure we're getting only the tutorial subdirectories (not other files) and then map them into the object format that Next requires.

With this in place, if the user visits *myapp.com/tutorial-exists* they will successfully view the app. If they visit a non-existant tutorial e.g *myapp.com/tutorial-doesnt-exist* they will get a 404 page.
