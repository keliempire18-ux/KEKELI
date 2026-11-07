# KEKELI

```bash
npm install
npm i @opennextjs/cloudflare@latest
npm i -D wrangler@latest
cp .env.example .env.local
npm run dev        # développement
npm run preview    # test dans l'environnement Cloudflare
npm run deploy     # mise en ligne (après `npx wrangler login`)
```
Sans variables Sanity, le site affiche des produits de démonstration.
