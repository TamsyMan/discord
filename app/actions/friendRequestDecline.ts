"use server";

import prisma from "../db";
import { revalidatePath } from "next/cache";

export default async function friendRequestDecline(userEmail: string, formdata: FormData) {
    const friendId = formdata.get('friendId') as string;

    const user = await prisma.user.update({
        where: {
            email: userEmail
        },
        data: {
            incomingFriendRequest: {
                disconnect: {
                    id: friendId
                }
            }
        }
    })

    revalidatePath('/friends/pending');
}