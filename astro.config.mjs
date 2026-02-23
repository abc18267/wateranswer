// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://wateranswer.com',
  integrations: [mdx(), sitemap()],
  trailingSlash: 'never',
  vite: {
    plugins: [tailwindcss()],
  },
})