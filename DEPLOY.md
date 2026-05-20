# cPanel deployment guide

**Live URL:** https://magellioffice.web.illinois.edu/ibc/survey-results/

## How it works

The repo contains both source code and a pre-built `out/` folder.
Every time Claude Code (or you) edits the site, the workflow is:

1. Edit source files
2. Run `pnpm build` (generates `out/`)
3. Commit everything (source + `out/`)
4. Push to GitHub

Then on cPanel, pull the update and the site is live — no build step
required on the server.

## Initial setup on cPanel (one time)

Clone the repo somewhere accessible, e.g. your home directory:

```bash
cd ~
git clone https://github.com/cfuiuc/ibc-surveydemo.git
```

Create the target directory and copy the static files in:

```bash
mkdir -p ~/public_html/ibc/survey-results
cp -a ~/ibc-surveydemo/out/. ~/public_html/ibc/survey-results/
```

## Updating the site on cPanel

```bash
cd ~/ibc-surveydemo
git pull
cp -a out/. ~/public_html/ibc/survey-results/
```

That's it — two commands. No Node.js, no build tools, no configuration.

## Alternative: manual upload

If you prefer not to use git on the server:

1. Download the `out/` folder from GitHub
2. Upload its **contents** (not the folder itself) into
   `public_html/ibc/survey-results/` via cPanel File Manager or SFTP

## What's in out/

```
out/
  index.html          # the page
  404.html            # error page
  favicon.ico
  _next/              # JS, CSS, fonts (entire folder required)
  data/               # stats.json, CSV, quote text files
```

The `.txt` files are Next.js build metadata — harmless but not required.

## Configuration

The basePath and assetPrefix in `next.config.ts` are set to
`/ibc/survey-results`. If the subdirectory ever changes, update both
values and rebuild.
