# AnalitCalc — catálogo de ferramentas independentes

O **AnalitCalc** é o nome da plataforma central, com login, cadastro, dashboard e ferramentas científicas. Não existe um segundo produto chamado “Analit Portal”. **Titulometria Clássica** é a primeira ferramenta, aberta em um ambiente externo próprio.

## Como aplicar o patch sem duplicar

Este ZIP é um **patch**: apenas substitua os arquivos equivalentes **na raiz** do projeto StackBlitz. Não importe a pasta inteira para `public/` e não apague os arquivos atuais. O `src/lib/auth/client.ts` já corrigido no seu StackBlitz **não foi incluído neste patch** e será preservado, assim como `.env.local`.

Depois das substituições, execute `npm run build` e `npm run dev`.

## Firestore: primeira ferramenta

No Firebase > Firestore Database > Dados, crie:

**Coleção:** `apps`  
**Documento:** `titulometria-classica`

| Campo | Tipo | Valor |
|---|---|---|
| `name` | string | `Titulometria Clássica` |
| `platform` | string | `AnalitCalc` |
| `category` | string | `Química Analítica` |
| `description` | string | `Cálculos de titulometria clássica` |
| `status` | string | `active` |
| `url` | string | URL `https://...` **real**, ou string vazia até publicar |

O dashboard lê a coleção `apps` e exibe um card para cada documento. A URL deve começar por `https://` para que o botão abra o ambiente externo.

**Permissão para um usuário específico:** identifique o UID em Firebase > Authentication > Users. No Firestore, crie o seguinte documento aninhado:

```text
userPermissions/{UID}/apps/titulometria-classica
  status: "active"      # string
  accessRole: "user"    # string
```

Se a coleção `userPermissions` ainda não existir, crie-a pelo console: documento `{UID}`, nele subcoleção `apps`, documento `titulometria-classica`. O documento `{UID}` pai pode ficar sem campos. **Não crie** `apps/analitcalc` para representar a Titulometria: `analitcalc` é a marca da plataforma, não um módulo independente.

Para ferramentas futuras, adicione novos documentos `apps/{slug-da-ferramenta}`. Use `status: "development"` até estarem disponíveis. O painel exibirá essas ferramentas como “Em desenvolvimento”, sem botão de acesso.

## Segurança importante

O Firebase Auth controla login, e as regras `firestore.rules` atuais permitem ao usuário somente ler suas próprias permissões; as permissões devem ser cadastradas por administradores pelo console ou por backend seguro. **Mostrar ou esconder links no dashboard não impede acesso direto ao site externo.** Cada ferramenta que exigir autorização precisa validar o ID token Firebase e consultar permissões em um backend confiável antes de permitir operações protegidas. Não compartilhe tokens em parâmetros de URL.

A integração com Firebase já validada pelo usuário (cadastro e Firestore) é preservada. **As coleções e perfis existentes não são apagados nem alterados** ao copiar este patch.

## Vercel

Depois de testar localmente, envie somente os arquivos corrigidos à branch de Preview. Mantenha as quatro variáveis `VITE_FIREBASE_*` da Vercel no ambiente Preview e confirme domínio autorizado no Firebase Authentication.
