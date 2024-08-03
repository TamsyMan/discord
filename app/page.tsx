import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page() {
    const session = await auth();

    if (!session || !session.user) {
        redirect('/auth/register')
    } else {
        redirect('/friends/online')
    }
}
