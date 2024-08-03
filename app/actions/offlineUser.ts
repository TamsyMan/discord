import prisma from "../db";

export default async function offlineUser(email: string) {
    const user = await prisma.user.update({
        where: {
            email: email
        },
        data: {
            online: false
        }
    })
}