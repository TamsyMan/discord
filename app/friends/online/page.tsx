import React from 'react'
import prisma from '@/app/db'
import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import offlineUser from '@/app/actions/offlineUser';
import Navbar from '@/app/components/FriendsPanels/Navbar';

export default async function page() {
  const session = await auth();

  if(!session || !session.user) {
    redirect('/api/auth/signin')
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: String(session?.user?.email)
    },
    include: {
      friends: {
        where: {
          online: true,
        },
        omit: {
          password: true,
        }
      }
    }
  })

  const onlineFriends = user.friends;
  
  return (
    <div>
      <Navbar/>
      <div className='py-6 px-8'>
        <div className='text-xs text-disc-white font-semibold mb-2 ml-3'>ONLINE - {onlineFriends.length}</div>
        {onlineFriends.map(friend => (
          <a href={"/friends/dms/" + friend.id} className='flex items-center py-3 hover:bg-disc-anothergray rounded-lg'>
            <img src={friend.avatar} className='w-10 aspect-square rounded-full ml-2'/>
            <div className='ml-3 flex flex-col'>
            <p className='font-semibold text-md'>{friend.username}</p>
            <p className='text-sm text-disc-white'>{friend.status}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
