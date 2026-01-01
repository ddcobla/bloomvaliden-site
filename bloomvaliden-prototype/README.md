# Bloomvaliden – Working Website Prototype (Static)

This is a lightweight, working prototype website for **Bloomvaliden** (IT consultancy, system integration, maintenance & repairs).

## What’s included
- Responsive multi-page site: Home, Services, Investigations, Support (ticket demo), About, Contact
- Theme toggle (dark/light)
- Working demo forms:
  - Contact form opens a prefilled email (mailto)
  - Support tickets saved locally in the browser (localStorage)
- Privacy principles page (prototype)

## Run locally
### Option A: VS Code Live Server
1. Open this folder in VS Code
2. Install “Live Server”
3. Right-click `index.html` → **Open with Live Server**

### Option B: Python simple server
From the project folder:
```bash
python -m http.server 8000
```
Then open: http://localhost:8000

## Deploy on GitHub Pages (quick)
1. Create a new GitHub repo (e.g., `bloomvaliden-site`)
2. Upload these files (or push with git)
3. In GitHub: **Settings → Pages**
4. Source: `Deploy from a branch`
5. Branch: `main` and folder `/root`
6. Save → your site will publish

## Next upgrades (recommended)
- Replace `mailto:` with a real endpoint (Formspree, HubSpot, or custom API)
- Add a proper helpdesk backend (tickets → email/CRM)
- Add case studies, pricing, and FAQs
- Add cookie banner + full privacy policy text


## Contact (Prototype)
- Email: bloomvaliden@gmail.com
- Phone: +233 54 792 7790 / 30 298 6340
- Instagram: @bloomvaliden
