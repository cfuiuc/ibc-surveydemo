# Deploying to cPanel shared hosting

## Live URL

https://magellioffice.web.illinois.edu/ibc/survey-results/

## Build

```bash
pnpm install
pnpm build
```

This produces an `out/` folder containing a fully static site. The build is
pre-configured with `basePath: '/ibc/survey-results'` so all asset paths
resolve correctly under that subdirectory.

## Upload to cPanel

Upload the **contents** of `out/` (not the folder itself) into:

```
public_html/ibc/survey-results/
```

So the structure on the server looks like:

```
public_html/
  ibc/
    survey-results/
      index.html
      404.html
      favicon.ico
      _next/            # JS, CSS, fonts — upload the entire folder
      data/             # stats.json, CSV, and quote text files
```

The `.txt` manifest files (`index.txt`, `__next.*.txt`) are Next.js build
metadata. Uploading them is harmless but not required.

## Notes

- No server, Node.js, or runtime required — everything is pre-rendered HTML + JS.
- If the subdirectory path changes, update `basePath` and `assetPrefix` in `next.config.ts` and rebuild.
