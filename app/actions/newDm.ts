"use server"

import prisma from "../db"

export default async function newDm(userId: string, formdata: FormData) {
    let newDmMembers: string[] = [userId];
    
    formdata.forEach((value, key) => {
        if(value === "on") {
            newDmMembers.push(key);
        }
    });

    const newDm = await prisma.directChannel.create({
        data: {
            users: {
                connect: newDmMembers.map((memberId) => {
                    return { id: memberId }
                })
            }
        }
    });
}