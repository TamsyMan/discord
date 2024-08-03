import NextAuth, { User, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { env } from "process";
import prisma from "@/app/db";
import bcrypt from "bcrypt";

export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username" },
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<User | null> {

                async function dbUser() {
                    try {
                        const user = await prisma.user.findFirstOrThrow({
                            where: {
                                username: String(credentials.username),
                                email: String(credentials.email),
                            }
                        })

                        const isMatch = await bcrypt.compare(String(credentials.password), String(user.password))

                        if (isMatch) {
                            return { id: user.id, name: user.username, email: user.email }
                        } else {
                            return null;
                        }

                    } catch(e) {
                        return null;
                    }
                }

                return dbUser();
            }
        })
    ],
    pages: {
        error: "/error"
    },
    basePath: BASE_PATH,
    secret: env.NEXTAUTH_SECRET
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);