import Navbar from '@/app/components/FriendsPanels/Navbar';
import prisma from '@/app/db';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react'

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
          omit: {
            password: true,
          },
          orderBy: {
            online: 'desc'
          }
        }
      }
    })
  
    const friends = user.friends;
    
    return (
      <div>
        <Navbar/>
        <div className='py-6 px-8'>
          <div className='text-xs text-disc-white font-semibold mb-2 ml-3'>ALL FRIENDS - {friends.length}</div>
          {friends.map(friend => (
            <a href={"/friends/dms/" + friend.id} key={friend.id} className='flex items-center py-3 hover:bg-disc-anothergray rounded-lg'>
              <img src={friend.avatar} className='w-10 aspect-square rounded-full ml-2'/>
              <div className='ml-3 flex flex-col'>
              <p className='font-semibold text-md'>{friend.username}</p>
              <p className='text-sm text-disc-white'>{friend.online ? friend.status : "Offline"}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    )
}
