
import friendRequestAccept from '@/app/actions/friendRequestAccept';
import friendRequestDecline from '@/app/actions/friendRequestDecline';
import Navbar from '@/app/components/FriendsPanels/Navbar';
import prisma from '@/app/db';
import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import React from 'react'
import { RxCross2 } from 'react-icons/rx';
import { TiTick } from 'react-icons/ti';

export default async function page() {
    const session = await auth();

    if (!session || !session.user) {
        redirect('/api/auth/signin')
    }

    const userEmail = String(session?.user?.email)

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: userEmail
        },
        omit: {
            password: true,
        },
        include: {
            incomingFriendRequest: {
                select: {
                    username: true,
                    avatar: true,
                    id: true,
                }
            }
        }
    })

    const incomingFriendRequests = user.incomingFriendRequest;

    const acceptFriendRequestWithEmail = friendRequestAccept.bind(null, userEmail);
    const declineFriendRequestWithEmail = friendRequestDecline.bind(null, userEmail);

  return (
    <div>
        <Navbar/>
        <div className='py-6 px-8'>
          <div className='text-xs text-disc-white font-semibold mb-2 ml-3'>FRIEND REQUESTS - {incomingFriendRequests.length}</div>
          {incomingFriendRequests.map(friend => (
            <div key={friend.id} className='flex items-center py-3 hover:bg-disc-anothergray rounded-lg justify-between'>
              <div className='flex items-center'>
                <img src={friend.avatar} className='w-10 aspect-square rounded-full ml-2'/>
                <p className='font-semibold text-md ml-3'>{friend.username}</p>
              </div>
                <div className='flex'>
                    <form action={acceptFriendRequestWithEmail}>
                        <button type='submit' name='accept' className='size-[30px] bg-disc-dgray flex justify-center items-center rounded-full mr-2'><TiTick size={30} className='text-green-500'/></button>
                        <input type='hidden' name='friendId' value={friend.id}/>
                    </form>
                    <form action={declineFriendRequestWithEmail}>
                        <button type='submit' name='decline' className='size-[30px] bg-disc-dgray flex justify-center items-center rounded-full'><RxCross2 size={25} className='text-red-500'/></button>
                        <input type='hidden' name='friendId' value={friend.id}/>
                    </form>
                </div>
            </div>
          ))}
        </div>
      </div>
  )
}
