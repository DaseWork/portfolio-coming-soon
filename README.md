# portfolio-coming-soon

Coming-soon page for [bymunoz.com](https://bymunoz.com/), deployed on Vercel as a static site (no build step).

| File | Purpose |
|---|---|
| `index.html` | The page: markup, styles and one inline script |
| `404.html` | Not-found page, served by Vercel for unknown URLs |
| `vercel.json` | Clean URLs and security headers |
| `robots.txt`, `sitemap.xml` | Search-engine files |
| `favicon.ico`, `apple-touch-icon.png` | Icons for crawlers and iOS home screens |

## Editing the inline script

`vercel.json` sets a Content-Security-Policy that allows the inline `<script>` in `index.html` by its SHA-256 hash. If you change that script, even by one character, recompute the hash and update `script-src` in `vercel.json`, or the browser will block it:

```bash
python3 -c "import re,hashlib,base64;s=open('index.html',encoding='utf-8').read();print('sha256-'+base64.b64encode(hashlib.sha256(re.search(r'<script>(.*?)</script>',s,re.S).group(1).encode()).digest()).decode())"
```

## Preview locally

```bash
python3 -m http.server 8000
```
