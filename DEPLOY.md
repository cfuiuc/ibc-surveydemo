# Deploying to cPanel shared hosting

## Build

```bash
pnpm install
pnpm build
```

This produces an `out/` folder containing a fully static site.

## Upload to cPanel

Upload the **contents** of `out/` (not the folder itself) into `public_html/` so that `index.html` sits at `public_html/index.html`.

The key files and folders:

```
public_html/
  index.html          # main page
  404.html            # error page
  favicon.ico
  _next/              # JS, CSS, and static chunks — upload the entire folder
  data/               # stats.json, CSV, and quote text files
```

You can ignore the `.txt` manifest files (`index.txt`, `__next.*.txt`, `_not-found.txt`) — they are Next.js build metadata and not required for the site to function. Uploading them is harmless.

## Notes

- No server, Node.js, or runtime required — everything is pre-rendered HTML + JS.
- If deploying to a subdirectory (e.g. `public_html/survey/`), set `basePath: '/survey'` in `next.config.ts` and rebuild.
