import NextAuth from "next-auth"
import { TokenEndpointHandler } from "next-auth/providers"

declare module "next-auth" {
    /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
    interface Session {
        user: {
            /** The user's postal address. */
            role: string,
            token: string,
            id: number,
            name: string,
            email_verified_at: string,
        }
    }
}

