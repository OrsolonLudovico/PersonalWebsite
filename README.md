# Personal Website

Source code of my personal website, live at **[www.ludovicoorsolon.com](https://www.ludovicoorsolon.com)**.

I built it to serve two purposes: a repository for my university notes and a place to showcase my CV.

## Sections

- **Home**: landing page
- **My notes**: university notes
- **My CV**: curriculum vitae
- **Contacts**: how to get in touch

## Tech stack

- HTML, CSS and JavaScript (no framework)
- [Cloudflare Pages](https://pages.cloudflare.com/) for hosting and deployment
- Custom domain managed through Cloudflare

## Project structure

```
.
├── assets/       # CSS, JavaScript and other site resources
├── fav/          # Favicons
├── images/       # Images used across the site
├── pages/        # Individual pages (notes, CV, contacts)
├── index.html    # Home page
├── robots.txt    # Crawler rules
└── sitemap.xml   # Sitemap for search engines
```

## Running locally

Since the site is fully static, there is nothing to install or build.

1. Clone the repository:

   ```bash
   git clone https://github.com/OrsolonLudovico/PersonalWebsite.git
   cd PersonalWebsite
   ```

2. Serve the folder with any static server, for example:

   ```bash
   python3 -m http.server 8000
   ```

3. Open [http://localhost:8000](http://localhost:8000) in browser.

## Deployment

The site is deployed automatically with Cloudflare Pages: every push to the `main` branch publishes a new version. No build command is needed, and the output directory is the repository root.
