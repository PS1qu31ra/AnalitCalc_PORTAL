
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type Auth,
} from "firebase/auth";

import { firebaseAuth } from "../firebase";

type AuthError = {
  message: string;
  code?: string;
};

function errorOf(error: unknown): AuthError {
  const code =
    error &&
    typeof error === "object" &&
    "code" in error &&
    typeof error.code === "string"
      ? error.code
      : undefined;

  return {
    code,
    message:
      error instanceof Error
        ? error.message
        : "Falha na autenticação",
  };
}

// Recebe uma instância válida do Firebase Authentication.
// Assim o TypeScript sabe que auth nunca será null aqui.
function createAuthClient(auth: Auth) {
  return {
    signUp: {
      email: async ({
        name,
        email,
        password,
      }: {
        name: string;
        email: string;
        password: string;
      }) => {
        try {
          const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          try {
            await updateProfile(result.user, {
              displayName: name,
            });
          } catch (profileError) {
            console.warn(
              "Conta criada, mas não foi possível atualizar o nome:",
              profileError
            );
          }

          return {
            error: null as AuthError | null,
          };
        } catch (error) {
          return {
            error: errorOf(error),
          };
        }
      },
    },

    signIn: {
      email: async ({
        email,
        password,
      }: {
        email: string;
        password: string;
      }) => {
        try {
          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          return {
            error: null as AuthError | null,
          };
        } catch (error) {
          return {
            error: errorOf(error),
          };
        }
      },
    },

    getSession: async () => {
      await auth.authStateReady();

      const user = auth.currentUser;

      return {
        data: user
          ? {
              user: {
                id: user.uid,
                name: user.displayName ?? "",
                email: user.email ?? "",
              },
            }
          : null,
      };
    },

    signOut: async () => {
      try {
        await signOut(auth);

        return {
          error: null as AuthError | null,
        };
      } catch (error) {
        return {
          error: errorOf(error),
        };
      }
    },
  };
}

// Só cria o cliente quando o Firebase estiver configurado.
export const authClient = firebaseAuth
  ? createAuthClient(firebaseAuth)
  : null;
