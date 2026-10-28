# Rajesh Mahanta — Portfolio

Personal portfolio built with **Node.js, Express, EJS and Bootstrap 5**.
All page content lives in JSON files inside the `data/` folder — edit the JSON, refresh the browser, done. No database needed.

## Run it

```bash
npm install
npm run dev     # with auto-reload (nodemon)
# or
npm start
```

Open http://localhost:3000

## Project structure

```
rajesh-portfolio/
├── app.js                  # Express app, view engine, global site data, 404/500
├── package.json
├── data/                   # ← all website content
│   ├── site.json           # name, email, nav links, socials, footer (used on every page)
│   ├── home.json           # hero, stats, services, CTA
│   ├── about.json          # bio, quick facts, skills, experience, values
│   ├── portfolio.json      # filters + all projects (with details for each project page)
│   └── contact.json        # email, quick-email templates, info cards
├── routes/
│   ├── pages.js            # /, /about, /portfolio, /portfolio/:slug, /contact
│   └── api.js              # /api/:page and /api/portfolio/:slug (raw JSON)
├── utils/
│   └── dataLoader.js       # reads JSON from /data (cached in production)
├── views/
│   ├── partials/           # head, navbar, footer, page-header, project-card
│   ├── index.ejs  about.ejs  portfolio.ejs  project.ejs  contact.ejs  404.ejs
└── public/
    ├── css/style.css
    ├── js/main.js          # typing effect, scroll reveal, portfolio filter, copy email
    └── images/
```

## Editing content

| To change…                         | Edit                    |
|-----------------------------------|-------------------------|
| Email, nav, social links          | `data/site.json`        |
| Hero text, typed roles, services  | `data/home.json`        |
| Bio, skills, experience           | `data/about.json`       |
| Projects                          | `data/portfolio.json`   |
| Contact page                      | `data/contact.json`     |

### Adding a project
Add an object to `projects` in `data/portfolio.json`:

```json
{
  "slug": "my-new-project",
  "title": "My New Project",
  "category": "Full CMS",
  "tags": ["CMS"],
  "icon": "bi-globe",
  "accent": "#ff7a45",
  "featured": true,
  "summary": "One-line summary.",
  "description": "Longer description for the detail page.",
  "features": ["Feature one", "Feature two"],
  "tech": ["Node.js", "MySQL"],
  "liveUrl": "https://...",
  "repoUrl": "https://github.com/..."
}
```

- `slug` becomes the URL: `/portfolio/my-new-project`
- `icon` is any [Bootstrap Icons](https://icons.getbootstrap.com/) class
- `featured: true` shows it on the home page (count set by `featuredCount` in `home.json`)
- `tags` must match one of the `filters` to appear under that filter
- Leave `liveUrl` / `repoUrl` empty (`""`) to hide those buttons

## Contact
The contact page has **no form** — only `mailto:` links, a copy-email button, a Gmail compose link, and ready-made email templates (subject + body pre-filled).

## Deploying
Set `NODE_ENV=production` so JSON data is cached in memory. `PORT` is read from the environment (defaults to 3000). Works on Render, Railway, a VPS with PM2, etc.
