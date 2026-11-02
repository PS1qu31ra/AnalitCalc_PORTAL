# Analit Portal — React/Vite com layout restaurado

Esta versão **restaura a composição original da homepage fornecida no ZIP `analit-portal (12).zip`**, sem reinstalar o Next.js. Mantém login, cadastro, dashboard, React Router e integração Neon preparados no projeto Vite anterior.

## O que foi corrigido

- Restaurados o layout original, a estrutura centralizada, o fundo claro, a tipografia, a identidade vermelha, o painel de registro, a seção do mapa e as informações institucionais da home.
- Mantido o CSS original em `src/components/portal/HomePortal.module.css`.
- `HomePortal.tsx` agora usa `react-router-dom` no lugar de `next/link` e `img` no lugar de `next/image`.
- O mapa foi migrado de volta com os pacotes `react-svg-worldmap` e `react-zoom-pan-pinch`.
- O mapa recebe números reais somente do endpoint `/api/analytics/reach` na Vercel. Na prévia local do StackBlitz, sem API, aparece mapa sem países destacados. Nenhuma métrica é simulada.
- Login/cadastro/painel não tiveram suas telas reestilizadas nesta correção.

## ATENÇÃO — imagens ausentes

O ZIP original continha os diretórios `public/brand` e `public/docs`, **mas não continha os arquivos de logotipo e certificado**. Para não criar marcas institucionais falsas, este pacote mostra um fallback textual no lugar das imagens até você adicionar os originais. Leia `public/brand/LEIA-ME.txt`. O certificado não tem link ativo porque faltava o PDF.

## Atualizar no StackBlitz

1. Mantenha o repositório Git atual. Faça backup/commit antes.
2. Extraia este ZIP e copie **todo o conteúdo do ZIP** para a raiz do projeto StackBlitz (sobrescreva `src`, `package.json` e afins, sem substituir `.git` ou suas variáveis `.env`).
3. No terminal, pare o servidor com `Ctrl+C` e execute:

```bash
npm install
npm run dev
```

4. Confira a home (`/`), login (`/login`), cadastro (`/cadastro`) e painel (`/painel`). A instalação anterior de dependências Neon pode exibir avisos `ERESOLVE`, que não têm relação com o CSS.
5. Para ativar dados e login, siga as instruções de Neon do ZIP anterior. As chaves `DATABASE_URL` são apenas do servidor; nunca configure segredos com `VITE_`.

**Limite de validação:** as dependências não puderam ser instaladas neste ambiente de geração (registro npm indisponível); faça o teste de renderização no StackBlitz antes de publicar.
Atualizacao deploy Preview
