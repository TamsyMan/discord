"use server";

import prisma from "../db";
import bcrypt from "bcrypt";

export default async function registerUser(formData: FormData) {

    const password = String(formData.get("password"))
    const hash: string = await bcrypt.hash(password, 12)

    try {
        const user = {
            email: String(formData.get("email")),
            username: String(formData.get("username")),
            password: hash,
        }

       await prisma.user.create({ data: user })

    } catch(e: any) {
        if (e.code === 'P2002') {
            console.log('Email or username already exists')
        } else {
            console.log(e)
        }
    }
}