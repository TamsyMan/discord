import React from 'react'
import prisma from '@/app/db'
import { auth } from "@/auth"
import Link from 'next/link';
import { FiPlus } from "react-icons/fi";

export default async function ServerList(props: any) {
    const serverId = props.serverId || null;
    const session = await auth();

    const user = await prisma.user.findUniqueOrThrow({
        where: {
        email: String(session?.user?.email)
        },
        include: {
            servers: {
              include: {
                channels: true
              }
            }
        }
    })
    const servers = user.servers

    /* user looks like this:
    {
    id: 'clylu0nct0000tv7sbk9xbssn',
    username: 'henry',
    email: 'henry@gmail.com',
    password: '$2b$12$Y9ezQeaBasQC1ej4VuwYp.xsWMkgbUCdvAdSHwuIEov8kDvGCJycC',
    emailVerified: false,
    avatar: null,
    createdAt: 2024-07-14T17:30:53.885Z,
    updatedAt: 2024-07-14T17:30:53.885Z,
    servers: [
        {
        id: 'clylu196n0000iq8w1pwb3yt4',
        name: "henry's server",
        createdAt: 2024-07-14T17:31:22.176Z
        }
    ]
    }

    servers is just the server value
    */

  return (
    <ul className='min-w-fit h-screen bg-disc-black pt-3'>
      <div className='flex items-center mb-2 mr-2'>
        <div className='h-2 w-1 z-10 rounded-r-full mr-1'></div>
        <Link href="/friends/online" className='h-12 aspect-square'>
          <div className='flex justify-center items-center h-12 aspect-square bg-disc-anothergray rounded-full hover:rounded-lg'>
            <img src="https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg" className='rounded-lg h-6 object-cover'/>
          </div>
        </Link>
      </div>
      <hr className='mx-4 py-1 border-disc-anothergray'/>
      {servers.map((server: any) => {
        if (serverId == server.id) {
          return (
            <div className='flex items-center mb-2 mr-2'>
              <div className='bg-white h-2 w-1 z-10 rounded-r-full mr-1'></div>
              <a href={"/servers/" + server.id + '/channels/' + server.channels[0].id} key={server.id}>
                <img src={String(server.icon)} className='rounded-lg h-12 aspect-square object-cover'/>
              </a>
            </div>
          ) 
        } else {
          return (
            <a href={"/servers/" + server.id + '/channels/' + server.channels[0].id} key={server.id}>
              <img src={String(server.icon)} className='rounded-full h-12 aspect-square object-cover ml-2 mb-2 hover:rounded-lg'/>
            </a>
          )
        }
      })}
      <Link href={"/servers/create/"} className='flex justify-center items-center h-12 aspect-square ml-2 mb-2'>
        <div className='bg-disc-anothergray rounded-full h-12 aspect-square flex justify-center items-center hover:rounded-lg'>
          <FiPlus size={36} color='#208e07'/>
        </div>
      </Link>
    </ul>
  )
}
