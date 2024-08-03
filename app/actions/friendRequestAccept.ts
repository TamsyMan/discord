"use server";

import { revalidatePath } from "next/cache";
import prisma from "../db";

export default async function friendRequestAccept(userEmail: string, formdata: FormData) {
    const friendId = formdata.get('friendId') as string;

    const user = await prisma.user.update({
        where: {
            email: userEmail
        },
        data: {
            friends: {
                connect: {
                    id: friendId
                }
            },
            friendedBy: {
                connect: {
                    id: friendId
                }
            },
            incomingFriendRequest: {
                disconnect: {
                    id: friendId
                }
            },
        }
    })

    revalidatePath('/friends/pending');
}