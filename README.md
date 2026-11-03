# AnalitCalc

Plataforma de acesso e catálogo de ferramentas científicas independentes, construída com React, TypeScript, Vite, Firebase Authentication e Cloud Firestore.

## Conceito

- **AnalitCalc** é a marca única: site, login, perfil e dashboard.
- **Titulometria Clássica** é a primeira ferramenta externa do catálogo.
- Novas calculadoras são adicionadas como documentos em `apps` no Firestore, cada uma com URL e status próprios.
- Permissões individuais são armazenadas em `userPermissions/{UID}/apps/{ID_DA_FERRAMENTA}`.

## Execução

```bash
npm install
npm run build
npm run dev
```

As variáveis de ambiente ficam em `.env.local` (não versionado). Veja `.env.example`.

## Configuração dos aplicativos

Veja [GUIA-ANALITCALC-FIREBASE.md](./GUIA-ANALITCALC-FIREBASE.md).

## Segurança

Senhas são tratadas pelo Firebase Authentication e **nunca** armazenadas no Firestore. O dashboard apresenta apenas os links autorizados. Ferramentas externas que exigirem acesso restrito precisam verificar a autenticação e a permissão **no próprio backend**.
