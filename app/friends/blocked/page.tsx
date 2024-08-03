import unblockUser from '@/app/actions/unblockUser';
import Navbar from '@/app/components/FriendsPanels/Navbar'
import prisma from '@/app/db';
import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page() {
    const session = await auth();

    if (!session || !session.user) {
        redirect('/api/auth/signin');
    }

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: session.user.email!,
        },
        omit: {
            password: true,
        },
        include: {
            blockedUsers: {
                omit: {
                    password: true,
                }
            }
        }
    })

    const blockedUsers = user.blockedUsers;

    const unblockUserWithEmail = unblockUser.bind(null, session.user.email!);

  return (
    <div>
        <Navbar />
        <div className='py-6 px-8'>
            <div className='text-xs text-disc-white font-semibold mb-2 ml-3'>BLOCKED - {blockedUsers.length}</div>
            {blockedUsers.map(blockedUser => (
                <div key={blockedUser.id} className='flex items-center justify-between py-3 hover:bg-disc-anothergray rounded-lg'>
                    <div className='flex items-center'>
                        <img src={blockedUser.avatar} className='w-10 aspect-square rounded-full ml-2'/>
                        <div className='ml-3 flex flex-col'>
                            <p className='font-semibold text-md'>{blockedUser.username}</p>
                        </div>
                    </div>
                    <form action={unblockUserWithEmail}>
                        <button type='submit' className='flex mr-2'>Unblock</button>
                        <input type='hidden' name='unblock' value={blockedUser.id}/>
                    </form>
                </div>
            ))}
        </div>
    </div>
  )
}
