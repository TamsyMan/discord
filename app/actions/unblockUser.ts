"use server";

import { revalidatePath } from "next/cache";
import prisma from "../db";

export default async function unblockUser(userEmail: string, formdata: FormData) {
    const userToUnblock = formdata.get('unblock') as string;

    const user = await prisma.user.update({
        where: {
            email: userEmail
        },
        data: {
            blockedUsers: {
                disconnect: {
                    id: userToUnblock
                }
            }
        }
    });

    revalidatePath('/friends/blocked');
}