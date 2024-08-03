import Navbar from '@/app/components/FriendsPanels/Navbar'
import React from 'react'
import AddFriend from './AddFriend'
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function page() {
    const session = await auth();

    if (!session || !session.user) {
        redirect('/api/auth/signin')
    }

    const userEmail: string = session.user.email!;
    const username: string = session.user.name!;

  return (
    <div className='flex flex-col w-full'>
        <Navbar/>
        <div className='px-8 py-6 w-full'>
            <h1 className='text-2xl font-semibold mb-2'>Add Friend</h1>
            <p className='text-disc-white text-sm'>You can add friends with their Discord usernames.</p>
            <AddFriend userEmail={userEmail} userName={username}/>
        </div>
    </div>
  )
}
