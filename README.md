# 🚀 AI Blog Pro - Powered by Fuwari

> Modern, fast, và beautiful AI blog template built với Astro framework. Perfect cho AI enthusiasts, researchers, và professionals muốn share knowledge về Machine Learning, Deep Learning, và Data Science.

![AI Blog Pro](https://img.shields.io/badge/AI%20Blog%20Pro-Live-brightgreen) ![Astro](https://img.shields.io/badge/Astro-5.8.1-orange) ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styled-cyan)

## ✨ Features

### 🎨 **Modern Design**
- **Clean, minimalist aesthetic** inspired by Japanese design principles
- **Dark/Light mode** với automatic system preference detection
- **Responsive design** perfect on all devices
- **Smooth animations** và micro-interactions
- **Professional typography** optimized for reading

### 📝 **Content-First**
- **Markdown/MDX support** với syntax highlighting
- **Math formulas** với KaTeX integration
- **Code blocks** với multiple language support
- **Image optimization** và lazy loading
- **Tags và categories** cho content organization

### 🚀 **Performance**
- **99+ Lighthouse scores** across all metrics
- **Static site generation** với Astro
- **Minimal JavaScript** bundle
- **CDN-ready** với optimized assets
- **Fast loading** và excellent SEO

### 🔧 **Developer Experience**
- **TypeScript** throughout
- **Modern tooling** với Vite và ESBuild
- **Hot reload** development server
- **ESLint và Prettier** configured
- **Git hooks** for code quality

### 📱 **Features for AI Blog**
- **Code syntax highlighting** cho Python, R, SQL, etc.
- **Mathematical notation** với KaTeX
- **Jupyter notebook** style code blocks
- **Research paper** citation support
- **AI/ML taxonomy** tags và categories

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build) - Modern static site generator
- **Styling**: [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- **Icons**: [Lucide Icons](https://lucide.dev) - Beautiful, consistent icons
- **Fonts**: [Inter](https://rsms.me/inter/) - Optimized for screens
- **Math**: [KaTeX](https://katex.org) - Fast math typesetting
- **Search**: [Pagefind](https://pagefind.app) - Static search

## 🚀 Quick Start

### Prerequisites
- **Node.js** >= 20.0.0
- **pnpm** >= 9.0.0 (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url> ai-blog-pro
   cd ai-blog-pro
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```
   Visit `http://localhost:4321` để see your blog!

4. **Build for production**
   ```bash
   pnpm build
   ```

## 📁 Project Structure

```
ai-blog-pro/
├── public/                 # Static assets
│   ├── images/            # Blog images
│   └── favicon.ico        # Favicon
├── src/
│   ├── components/        # Reusable components
│   ├── content/          # Blog content
│   │   ├── posts/        # Blog posts (markdown)
│   │   └── spec/         # Pages (about, etc.)
│   ├── layouts/          # Page layouts
│   ├── pages/            # Route pages
│   ├── styles/           # Global styles
│   └── config.ts         # Site configuration
├── astro.config.mjs      # Astro configuration
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## ⚙️ Configuration

### Site Settings

Edit `src/config.ts` to customize your blog:

```typescript
export const siteConfig: SiteConfig = {
  title: "Your AI Blog",
  subtitle: "Exploring AI & Machine Learning",
  lang: "en",
  themeColor: {
    hue: 210,  // Blue theme
    fixed: false
  },
  banner: {
    enable: true,
    src: "assets/images/banner.jpg"
  }
};

export const profileConfig: ProfileConfig = {
  avatar: "assets/images/avatar.png",
  name: "Your Name",
  bio: "AI Researcher & Developer",
  links: [
    {
      name: "GitHub",
      url: "https://github.com/yourusername",
      icon: "github"
    }
    // Add more social links
  ]
};
```

### Navigation

Customize navigation in `src/config.ts`:

```typescript
export const navBarConfig: NavBarConfig = {
  links: [
    { name: "Posts", url: "/posts", external: false },
    { name: "Archive", url: "/archive", external: false },
    { name: "Categories", url: "/categories", external: false },
    { name: "About", url: "/about", external: false }
  ]
};
```

## 📝 Content Creation

### Writing Blog Posts

1. **Create new post**
   ```bash
   pnpm new-post "your-post-title"
   ```

2. **Edit frontmatter**
   ```yaml
   ---
   title: "Your Post Title"
   published: 2025-06-08
   description: "Post description for SEO"
   image: "path/to/image.jpg"
   tags: [AI, Machine Learning, Python]
   category: "Tutorial"
   draft: false
   ---
   ```

3. **Write content** in Markdown với support cho:
   - Code blocks với syntax highlighting
   - Math formulas: `$E = mc^2$` hoặc `$$\sum_{i=1}^n x_i$$`
   - Images: `![Alt text](path/to/image)`
   - Tables, lists, và more

### Code Examples

Python code với syntax highlighting:

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

# Generate sample data
X = np.random.randn(100, 1)
y = 2 * X + 1 + 0.1 * np.random.randn(100, 1)

# Train model
model = LinearRegression()
model.fit(X, y)

# Predict
predictions = model.predict(X)

print(f"Coefficient: {model.coef_[0][0]:.2f}")
print(f"Intercept: {model.intercept_[0]:.2f}")
```

### Math Formulas

Inline math: The loss function is $L = \frac{1}{n}\sum_{i=1}^n (y_i - \hat{y_i})^2$

Block math:
$$
\nabla_\theta J(\theta) = \frac{1}{m} \sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)}) x^{(i)}
$$

## 🎨 Customization

### Colors và Theming

The blog supports custom color themes. Modify `src/config.ts`:

```typescript
themeColor: {
  hue: 210,        // 0-360, determines base color
  fixed: false     // Allow users to customize
}
```

### Fonts

Change fonts in `src/layouts/BaseLayout.astro`:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Adding Components

Create reusable components in `src/components/`:

```astro
---
// src/components/CodeBlock.astro
interface Props {
  language: string;
  code: string;
}

const { language, code } = Astro.props;
---

<div class="code-block">
  <pre class={`language-${language}`}><code>{code}</code></pre>
</div>
```

## 🚀 Deployment

Multiple deployment options available:

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify
```bash
# Build và deploy
pnpm build
# Drag ./dist folder to netlify.app
```

### GitHub Pages
Add GitHub Actions workflow (see `DEPLOYMENT_GUIDE.md` for details)

## 🔧 Development

### Available Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm new-post "title"` - Create new blog post
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code với Prettier

### Code Quality

The project includes:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety
- **Husky** for Git hooks
- **lint-staged** for pre-commit checks

## 📊 Analytics & SEO

### Built-in SEO Features
- **Meta tags** optimization
- **Open Graph** tags for social sharing
- **Structured data** (JSON-LD)
- **Sitemap** generation
- **Robots.txt** configuration

### Analytics Integration

Add Google Analytics to `src/layouts/BaseLayout.astro`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🤝 Contributing

We welcome contributions! Please:

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Development Guidelines
- Follow existing code style
- Add TypeScript types
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation if needed

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Fuwari](https://github.com/saicaca/fuwari)** - Original template
- **[Astro](https://astro.build)** - Amazing framework
- **[Tailwind CSS](https://tailwindcss.com)** - Styling system
- **[Inter Font](https://rsms.me/inter/)** - Typography
- **AI Community** - Inspiration và feedback

## 📞 Support

- **Documentation**: Check `DEPLOYMENT_GUIDE.md` for detailed setup
- **Issues**: [GitHub Issues](../../issues) for bug reports
- **Discussions**: [GitHub Discussions](../../discussions) for questions
- **Email**: contact@your-domain.com

---

## 🌟 Showcase

Using AI Blog Pro? We'd love to feature your blog! Submit a PR adding your site to this section.

### Live Examples
- **AI Blog Pro Demo**: [demo-link] - Example implementation
- **Your Blog Here**: Submit your blog URL!

---

**⭐ Star this repository nếu you find it helpful! It helps others discover the project.**

**🚀 Happy blogging! Share your AI knowledge với the world!**
