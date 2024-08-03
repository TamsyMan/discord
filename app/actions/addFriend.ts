"use server"

import prisma from "../db";

export default async function addFriend(userEmail: string, userName: string, formdata: FormData) {
    const friendUsername = formdata.get('input') as string;
    if (friendUsername === userName) {
        return { error: { message: "You cannot add yourself as a friend." } }
    }

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: userEmail,
        },
        omit: {
            password: true,
        },
        include: {
            blockedBy: {
                select: {
                    email: true,
                    username: true,
                }
            }
        }
    })

    const blockedBy = user.blockedBy;

    if (blockedBy.some(user => user.username === friendUsername)) {
        return;
    }

    try {
        const user = await prisma.user.update({
            where: {
                email: userEmail,
            },
            omit: {
                password: true,
            },
            data: {
                friends: {
                    connect: {
                        username: friendUsername, 
                    }
                }
            }
        })
    } catch(error: any) {
        if (error.code === "P2025") {
            return { error: { message: "The user does not exist." } }
        } else {
            return { error: { message: "An error occurred." } }
        }
    }
}