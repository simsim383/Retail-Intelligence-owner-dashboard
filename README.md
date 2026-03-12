# Retail Intelligence — Marketing Website

Landing page for **Retail Intelligence** — smart stock analytics for independent convenience stores.

Built with **Vite + React**. Deploy to Vercel in one click.

---

## 📁 Structure

```
retail-intelligence-site/
├── index.html          ← Vite entry point
├── package.json
├── vite.config.js
├── .gitignore
├── public/
│   └── favicon.svg
└── src/
    ├── App.jsx         ← All page components
    ├── main.jsx        ← React root
    └── index.css       ← All styles
```

---

## 🚀 Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import your repo
3. Vercel auto-detects Vite — leave all settings as default
4. Click **Deploy** ✓

---

## 💻 Run Locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

---

## 📬 Contact Form (Formspree)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a form → copy your Form ID (e.g. `xyzabcde`)
3. Open `src/App.jsx` and find the top of the file:

```js
const FORMSPREE_ID = 'YOUR_FORM_ID'
```

4. Replace `YOUR_FORM_ID` with your actual ID
5. Commit and push — done ✓

---

## 🎨 Customisation

- **Colours** — all CSS variables at the top of `src/index.css`
- **Pricing** — edit the `basicFeatures` / `proFeatures` arrays in the `Pricing` component in `src/App.jsx`
- **Dashboard data** — edit the mock data arrays in the `Hero` and `Features` components

---

© 2026 Retail Intelligence · Built in the UK
