# 🚀 AI Blog Pro - Deployment Guide

Hướng dẫn chi tiết để deploy AI Blog Pro (Fuwari template) lên các platforms khác nhau.

## 📋 Prerequisites

### System Requirements
- **Node.js** >= 20.0.0
- **pnpm** >= 9.0.0 (recommended) hoặc npm/yarn
- **Git** for version control

### Verification
```bash
node --version    # Should be >= 20
pnpm --version    # Should be >= 9
git --version     # Any recent version
```

## 🔧 Local Development Setup

### 1. Clone & Install
```bash
git clone <your-repo-url> ai-blog-pro
cd ai-blog-pro
pnpm install
```

### 2. Development Server
```bash
pnpm dev
# Opens at http://localhost:4321
```

### 3. Build for Production
```bash
pnpm build
# Creates ./dist/ folder với static files
```

## 🌐 Deployment Options

## 1. 🔷 **Vercel (Recommended)**

### Why Vercel?
- ✅ **Zero config** deployment for Astro
- ✅ **Automatic HTTPS** và CDN
- ✅ **Git integration** - auto deploy on push
- ✅ **Edge functions** support
- ✅ **Free tier** available

### Deployment Steps

#### Option A: Vercel Dashboard
1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Initial blog setup"
   git push origin main
   ```

2. **Go to [vercel.com](https://vercel.com)**
3. **Connect GitHub account**
4. **Import your repository**
5. **Configure settings**:
   - Framework: **Astro**
   - Build Command: `pnpm build`
   - Output Directory: `dist`
6. **Deploy!** 🚀

#### Option B: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Custom Domain Setup
1. **Purchase domain** (Namecheap, GoDaddy, etc.)
2. **In Vercel Dashboard** → Project → Settings → Domains
3. **Add your domain**
4. **Configure DNS**:
   ```
   Type: CNAME
   Name: www (or @)
   Value: cname.vercel-dns.com
   ```

---

## 2. 🔶 **Netlify**

### Why Netlify?
- ✅ **Simple drag-and-drop** deployment
- ✅ **Form handling** built-in
- ✅ **Split testing** capabilities
- ✅ **Generous free tier**

### Deployment Steps

#### Option A: Netlify Dashboard
1. **Build locally**
   ```bash
   pnpm build
   ```

2. **Go to [netlify.com](https://netlify.com)**
3. **Drag `dist` folder** to deploy area
4. **Site deployed!**

#### Option B: Git Integration
1. **Push to GitHub**
2. **Connect repository** in Netlify
3. **Configure build settings**:
   - Build command: `pnpm build`
   - Publish directory: `dist`
4. **Deploy**

### Netlify CLI
```bash
# Install
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

---

## 3. ⭐ **GitHub Pages**

### Why GitHub Pages?
- ✅ **Free hosting** for public repos
- ✅ **Built-in CI/CD** với GitHub Actions
- ✅ **Custom domains** supported
- ✅ **Perfect for open source** projects

### Setup GitHub Actions

1. **Create workflow file**: `.github/workflows/deploy.yml`
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]
     pull_request:
       branches: [ main ]

   permissions:
     contents: read
     pages: write
     id-token: write

   concurrency:
     group: "pages"
     cancel-in-progress: false

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4
         
         - name: Setup Node.js
           uses: actions/setup-node@v4
           with:
             node-version: '20'
             cache: 'pnpm'
         
         - name: Install pnpm
           run: npm install -g pnpm
         
         - name: Install dependencies
           run: pnpm install
         
         - name: Build site
           run: pnpm build
         
         - name: Upload Pages artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: ./dist

     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       needs: build
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

2. **Enable GitHub Pages**:
   - Repository Settings → Pages
   - Source: **GitHub Actions**

3. **Update Astro config** (`astro.config.mjs`):
   ```js
   export default defineConfig({
     site: 'https://yourusername.github.io',
     base: '/your-repo-name', // If not using custom domain
     // ... other config
   });
   ```

---

## 4. 🔵 **AWS S3 + CloudFront**

### Why AWS?
- ✅ **Scalable** và enterprise-ready
- ✅ **Global CDN** với CloudFront
- ✅ **Fine-grained control** over infrastructure
- ✅ **Integration** với other AWS services

### Setup Steps

1. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://your-blog-bucket-name
   ```

2. **Configure for static hosting**
   ```bash
   aws s3 website s3://your-blog-bucket-name \
     --index-document index.html \
     --error-document 404.html
   ```

3. **Upload build**
   ```bash
   pnpm build
   aws s3 sync ./dist/ s3://your-blog-bucket-name --delete
   ```

4. **Setup CloudFront Distribution**
   - Origin: Your S3 bucket
   - Viewer Protocol Policy: Redirect HTTP to HTTPS
   - Caching: Optimized for performance

### Automated Deployment Script
```bash
#!/bin/bash
# deploy-aws.sh

echo "Building site..."
pnpm build

echo "Uploading to S3..."
aws s3 sync ./dist/ s3://your-blog-bucket-name --delete

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"

echo "Deployment complete! 🚀"
```

---

## 🔧 Configuration for Production

### 1. Update `astro.config.mjs`
```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://yourdomain.com', // Your actual domain
  base: '/', // Base path if deploying to subdirectory
  outDir: './dist',
  
  // Performance optimizations
  experimental: {
    optimizeHoistedScript: true,
  },
  
  // SEO improvements
  compilerOptions: {
    typescript: {
      strictNullChecks: true
    }
  }
});
```

### 2. Environment Variables
Create `.env.production`:
```env
SITE_URL=https://yourdomain.com
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
CONTACT_EMAIL=contact@yourdomain.com
```

### 3. SEO Optimization
- **Meta tags** properly configured
- **Sitemap** generation enabled
- **Robot.txt** configured
- **Open Graph** tags added
- **Schema markup** implemented

---

## 📊 Analytics & Monitoring

### Google Analytics 4
1. **Create GA4 property**
2. **Add tracking code** to layout
3. **Configure events** tracking

### Performance Monitoring
- **Lighthouse** scores tracking
- **Core Web Vitals** monitoring
- **Uptime monitoring** với services như Uptime Robot

---

## 🔒 Security Best Practices

### Content Security Policy
Add to `public/_headers`:
```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com;
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

### HTTPS Enforcement
Most platforms handle this automatically, but ensure:
- **Force HTTPS** enabled
- **HSTS headers** configured
- **Mixed content** warnings resolved

---

## 🚀 CI/CD Pipeline Example

### Complete GitHub Actions Workflow
```yaml
name: Build and Deploy AI Blog Pro

on:
  push:
    branches: [ main ]
  workflow_dispatch:

env:
  NODE_VERSION: '20'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      
      - name: Install pnpm
        run: npm install -g pnpm
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Run tests
        run: pnpm test
      
      - name: Check build
        run: pnpm build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      
      - name: Install pnpm
        run: npm install -g pnpm
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build
        run: pnpm build
        env:
          SITE_URL: ${{ secrets.SITE_URL }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 🎯 Performance Optimization

### Build Optimizations
```bash
# Optimize images
pnpm add -D @astrojs/image

# Enable compression
pnpm add -D astro-compress

# Bundle analysis
pnpm build --experimental-ssr
```

### Caching Strategy
- **Static assets**: 1 year cache
- **HTML pages**: 1 hour cache với revalidation
- **API responses**: Appropriate cache based on content

---

## 🔍 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Check Node.js version
node --version # Should be >= 20
```

#### Image Loading Issues
```bash
# Ensure images are in correct directory
public/images/     # For static images
src/assets/images/ # For processed images
```

#### Deployment Fails
- Check **build logs** for specific errors
- Verify **environment variables** are set
- Ensure **dependencies** are properly installed
- Check **file permissions** và paths

---

## 📞 Support & Resources

### Documentation
- **Astro Docs**: [docs.astro.build](https://docs.astro.build)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)

### Community
- **Astro Discord**: [astro.build/chat](https://astro.build/chat)
- **GitHub Issues**: For technical problems
- **Blog Comments**: For content feedback

---

**🎉 Congratulations! Your AI Blog Pro is now live và ready to share knowledge với the world!**

*Remember to update content regularly và engage với your audience để build a thriving AI community.* 