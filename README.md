# Personal Website & Blog

A Jekyll-based personal website and blog, hosted on GitHub Pages. This site features a clean, responsive design and manages blog posts using Markdown.

## Features

- 📝 **Markdown Blog Posts**: Write posts in simple markdown format
- 🎨 **Responsive Design**: Mobile-friendly and accessible
- 🚀 **GitHub Pages**: Free hosting with automatic deployment
- 🔍 **SEO Optimized**: Built-in SEO tags and RSS feed
- 📱 **Clean UI**: Modern, minimalist design

## Project Structure

```
.
├── _config.yml           # Site configuration
├── _layouts/             # HTML layouts
│   ├── default.html      # Base layout
│   ├── home.html         # Homepage layout
│   └── post.html         # Blog post layout
├── _includes/            # Reusable components
│   ├── header.html       # Site header
│   └── footer.html       # Site footer
├── _posts/               # Blog posts (markdown)
│   └── YYYY-MM-DD-title.md
├── assets/
│   └── css/
│       └── style.css     # Custom styles
├── index.md              # Homepage
├── about.md              # About page
├── blog.md               # Blog listing page
├── Gemfile               # Ruby dependencies
└── README.md             # This file
```

## Getting Started

### Prerequisites

- Ruby (2.5.0 or higher)
- Bundler (`gem install bundler`)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/namwoam/namwoam-personal-website.git
   cd namwoam-personal-website
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Run the development server**
   ```bash
   bundle exec jekyll serve
   ```

4. **View the site**
   Open your browser and navigate to `http://localhost:4000`

The site will automatically rebuild when you make changes to files.

## Creating Blog Posts

### Writing a New Post

1. Create a new file in the `_posts/` directory with the format:
   ```
   YYYY-MM-DD-title-of-post.md
   ```

2. Add front matter at the top of the file:
   ```markdown
   ---
   layout: post
   title: "Your Post Title"
   date: 2025-11-09 10:00:00 -0000
   tags: [tag1, tag2, tag3]
   ---
   ```

3. Write your content in Markdown below the front matter

### Example Post

```markdown
---
layout: post
title: "My Awesome Post"
date: 2025-11-09 15:30:00 -0000
tags: [tutorial, programming]
---

# My Awesome Post

This is the content of my post written in **Markdown**.

## Features

- Easy to write
- Supports code blocks
- Images and links

\`\`\`python
def hello():
    print("Hello, World!")
\`\`\`
```

## Customization

### Site Configuration

Edit `_config.yml` to customize:
- Site title and description
- Your name and email
- Social media links
- URL structure

### Styling

Modify `assets/css/style.css` to change:
- Colors and fonts
- Layout and spacing
- Responsive breakpoints

### Layouts

Customize HTML templates in `_layouts/` and `_includes/` to change:
- Page structure
- Navigation
- Header and footer

## Deployment to GitHub Pages

1. **Create a GitHub repository** named `username.github.io` (replace `username` with your GitHub username)

2. **Push your code**
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/username.github.io.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "main" branch as source
   - Save

4. **Visit your site**
   Your site will be live at `https://username.github.io` in a few minutes!

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the root with your domain name
2. Configure DNS settings with your domain provider
3. Update the `url` in `_config.yml`

## Technologies Used

- **Jekyll**: Static site generator
- **Liquid**: Templating language
- **Markdown**: Content writing
- **GitHub Pages**: Hosting
- **HTML/CSS**: Front-end

## Contributing

Feel free to fork this project and customize it for your own use!

## License

This project is open source and available under the [MIT License](LICENSE).

## Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Markdown Guide](https://www.markdownguide.org/)
- [Liquid Template Language](https://shopify.github.io/liquid/)

## Contact

- **GitHub**: [@namwoam](https://github.com/namwoam)
- **Email**: your.email@example.com

---

**Happy blogging!** 🚀
