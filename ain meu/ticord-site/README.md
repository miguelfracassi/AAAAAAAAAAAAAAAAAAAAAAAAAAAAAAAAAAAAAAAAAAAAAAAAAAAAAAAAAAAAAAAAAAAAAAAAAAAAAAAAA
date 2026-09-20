# Site institucional da Ticord

Site estático em HTML, CSS e JavaScript puro. Não precisa de build.

## Estrutura

```
/index.html      → página inicial
/sobre.html      → sobre o grupo
/projetos.html   → projetos administrados
/apoio.html      → central de apoio (com redirecionamento)
/css/style.css   → todo o estilo (cores no topo do arquivo, bloco :root)
/js/script.js    → header fixo, menu mobile e redirecionamento do apoio
/js/auth.js      → login, cadastro, menu da conta e sair 
/js/dashboard.js → libera o dashboard só para clientes
/dashboard.html  → área do cliente
/api/            → cadastro, login, sair e sessão (funções da Vercel)
/lib/            → banco Neon e senhas
/package.json    → dependência do Neon
/assets/         → logos (ticord, fun, cord, wow, shopping-mall)
/vercel.json     → configuração de hospedagem na Vercel
```

## Como editar

- **Cores:** bloco `:root` no início de `css/style.css`.
- **Adicionar um projeto:** em `projetos.html`, copie o bloco `<article class="project">` marcado como modelo. Depois inclua a marca também em `index.html` (blocos `.brand-cell` e `.structure-item`) e o link no rodapé.
- **Trocar uma logo:** substitua o arquivo dentro de `/assets` mantendo o mesmo nome.
- **Mudar o destino do apoio:** `apoio.html`, no `href` do botão e no `data-redirect` da div `#auto-redirect`. O tempo do redirecionamento fica em `data-seconds`.
- **Textos:** todos estão direto no HTML, com comentários indicando cada bloco.

## Publicar

Vercel: importe a pasta ou rode `vercel` na raiz. Também funciona em Netlify, GitHub Pages ou qualquer hospedagem estática — basta enviar os arquivos.

## Login (Neon + Vercel)

1. Vercel → Storage → Neon → conecte o banco ao projeto (cria a variável `DATABASE_URL`).
2. Publique. As tabelas `users` e `sessions` são criadas sozinhas no primeiro acesso.
3. Para tornar alguém cliente, no Neon (SQL Editor): `update users set is_client = true where email = 'email@da.pessoa';`
