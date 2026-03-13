# Next.js + MDX migration app

This folder is the new site target while the legacy Gatsby site remains intact at repo root.

## 1) Install dependencies

```bash
cd next-site
npm install
```

## 2) Configure environment

```bash
cp .env.example .env.local
```

Set these values:

- `NEXT_PUBLIC_SITE_URL` (your canonical site URL)
- `WORDPRESS_GRAPHQL_URL` (usually `https://<site>/graphql`)
- `WORDPRESS_AUTH_TOKEN` (optional, only if your WP GraphQL is protected)

## 3) Import WordPress posts to MDX

```bash
npm run import:wp
```

This writes `.mdx` files into `content/posts`.

## 4) Run locally

```bash
npm run dev
```

Pages:

- `/` home
- `/blog` blog index
- `/blog/[slug]` blog post route
- `/rss.xml` RSS feed
- `/sitemap.xml` sitemap

## Notes

- Existing Gatsby project is untouched and can keep running in parallel.
- The import script is idempotent by slug and will overwrite existing files with the same slug.
- After import, review posts containing shortcodes/custom embeds and convert those manually to MDX components.
