import prisma from '@/app/db';
import UserPanel from '@/app/servers/[serverId]/channels/[channelId]/UserPanel';
import { auth } from '@/auth';
import Link from 'next/link';
import React from 'react'
import { FaUserFriends } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { GiCarWheel } from "react-icons/gi";
import DMSection from './DMSection';

export default async function Sidebar() {
    const session = await auth();

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: String(session?.user?.email)
        },
        omit: {
            password: true,
        },
    })

  return (
    <div className='h-screen w-72 bg-disc-mgray flex flex-col justify-between'>
        <div className='m-3'>
            <Link href="/friends/online" className='flex items-center hover:bg-disc-anothergray rounded-lg p-3'>
                <FaUserFriends size={24} fill='white'/>
                <p className='font-semibold ml-3'>Friends</p>
            </Link>
            <Link href="/nitro" className='flex items-center hover:bg-disc-anothergray rounded-lg p-3'>
                <GiCarWheel size={24} fill='white'/>
                <p className='font-semibold ml-3'>Nitro</p>
            </Link>
            <Link href="/shop" className='flex items-center hover:bg-disc-anothergray rounded-lg p-3'>
                <FaShop size={24} fill='white'/>
                <p className='font-semibold ml-3'>Shop</p>
            </Link>
            <DMSection userId={user.id}/>
        </div>
        <UserPanel user={user}/>
    </div>
  )
}
