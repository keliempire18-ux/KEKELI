# Mise en route Supabase
1. supabase.com > New project (notez le mot de passe de la base).
2. SQL Editor : ouvrez `supabase/schema.sql`, remplacez VOTRE_EMAIL par votre e-mail admin, collez et cliquez Run.
3. Authentication > Users > Add user : votre e-mail + un mot de passe fort (cochez Auto confirm).
4. Authentication > Sign In / Providers : désactivez "Allow new users to sign up".
5. Project Settings > API : copiez l'URL du projet et la clé anon (ou "publishable").
6. Vercel > Settings > Environment Variables : NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY, puis Redeploy.
7. Ouvrez votre-site/admin, connectez-vous, ajoutez vos produits.
Sur GitHub, supprimez ensuite les dossiers devenus inutiles : `sanity/` et `components/product/`.
