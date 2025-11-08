---
layout: post
title: "Getting Started with Jekyll and GitHub Pages"
date: 2025-11-08 14:30:00 -0000
tags: [jekyll, github-pages, tutorial]
---

# Getting Started with Jekyll and GitHub Pages

If you're looking to create a personal website or blog with minimal hassle, Jekyll and GitHub Pages are an excellent combination. In this post, I'll walk you through the basics of setting up your own site.

## What is Jekyll?

Jekyll is a static site generator that transforms plain text into static websites and blogs. It's:

- **Simple**: No databases, comment moderation, or updates to install
- **Static**: Just HTML, CSS, and JavaScript
- **Blog-aware**: Permalinks, categories, pages, posts, and custom layouts

## Why GitHub Pages?

GitHub Pages offers:

- **Free hosting** for your static website
- **Automatic deployment** when you push to your repository
- **Custom domains** support
- **HTTPS** by default

## Quick Setup Guide

### 1. Create a Repository

Create a new repository named `username.github.io` where username is your GitHub username.

### 2. Basic Structure

Your Jekyll site needs at least:

```
.
├── _config.yml
├── _layouts/
│   └── default.html
├── _posts/
│   └── 2025-11-08-my-first-post.md
└── index.md
```

### 3. Configuration

Create a `_config.yml` file:

```yaml
title: My Awesome Site
description: A blog about coding and technology
baseurl: ""
url: "https://username.github.io"
```

### 4. Create Your First Post

Posts are stored in `_posts/` with the naming convention: `YYYY-MM-DD-title.md`

```markdown
---
layout: post
title: "My First Post"
date: 2025-11-08
---

Hello world!
```

### 5. Push and Deploy

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

Your site will be live at `https://username.github.io` in a few minutes!

## Writing in Markdown

Markdown makes writing content easy:

- **Bold**: `**text**`
- *Italic*: `*text*`
- [Links]: `[text](url)`
- Lists, code blocks, and more!

## Next Steps

Once you have the basics working, you can:

1. Customize your theme
2. Add custom CSS
3. Create multiple pages
4. Use Jekyll plugins
5. Set up a custom domain

## Conclusion

Jekyll and GitHub Pages provide a powerful yet simple platform for creating your online presence. The combination of version control, markdown writing, and free hosting makes it an ideal choice for developers.

Happy blogging!

---

*Have questions? Feel free to reach out!*
