
# Potentia Lab

This is a Vite + React project adapted from a Figma-exported code bundle.

## Local development

```bash
npm install
npm run dev
```

## Production build check

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

The project includes `.github/workflows/deploy-pages.yml`, which deploys on every push to `main`.

1. Push this repository to GitHub.
2. In GitHub, go to **Settings -> Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main` (or run the workflow manually from the Actions tab).

Notes:
- Vite is configured with a production relative base (`./`) in `vite.config.ts`, so assets load correctly on GitHub Pages project URLs.
- The site will be published at `https://<your-user>.github.io/<your-repo>/` unless you use a custom domain.
  