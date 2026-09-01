import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * `vite preview` rewrites every request to /index.html before it looks for a
 * directory index, which hides the per-route HTML that scripts/generate-seo.mjs
 * writes into dist/<route>/index.html. This middleware restores the correct
 * order — exact file, then <route>/index.html, then the SPA fallback — so a
 * local preview shows the same <head> a crawler will get in production.
 *
 * Production hosting needs the same precedence. See public/.htaccess,
 * wrangler.toml (Cloudflare), and for nginx:
 *   try_files $uri $uri/index.html /index.html;
 */
function servePrerenderedRoutes() {
  return {
    name: 'serve-prerendered-routes',
    configurePreviewServer(server) {
      const dist = path.resolve('dist')
      server.middlewares.use((req, res, next) => {
        const pathname = req.url.split('?')[0]
        if (pathname === '/' || path.extname(pathname)) return next()

        const candidate = path.join(dist, pathname, 'index.html')
        if (!candidate.startsWith(dist) || !fs.existsSync(candidate)) return next()

        res.setHeader('Content-Type', 'text/html')
        res.end(fs.readFileSync(candidate))
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), servePrerenderedRoutes()]
})
