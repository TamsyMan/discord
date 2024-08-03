import React from 'react'
import ServerList from './ServerList';
import ChannelList from './ChannelList';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import prisma from '@/app/db';
import Channel from './Channel';
export const dynamic = 'force-dynamic'

export default async function page({params}: {params: {serverId: string; channelId: string}}) {
    const session = await auth();
    const serverId = params.serverId
    const channelId = params.channelId

    if(!session || !session.user) {
      redirect('/api/auth/signin')
    }

    const user = await prisma.user.findUniqueOrThrow({
      where: {
          email: String(session?.user?.email)
        },
        include: {
            servers: true
        },
        omit: {
          password: true,
        }
    })

    const servers = user.servers

  /* the user looks like this:
  {
    id: 'clylu0nct0000tv7sbk9xbssn',
    username: 'henry',
    email: 'henry@gmail.com',
    password: '$2b$12$Y9ezQeaBasQC1ej4VuwYp.xsWMkgbUCdvAdSHwuIEov8kDvGCJycC',
    emailVerified: false,
    avatar: null,
    createdAt: 2024-07-14T17:30:53.885Z,
    updatedAt: 2024-07-14T17:30:53.885Z
  }
  */
  const server = await prisma.server.findUniqueOrThrow({
    where: {
      id: params.serverId
    },
    include: {
      users: true
    }
  })

  let match = false;
  for(let i = 0; i < server.users.length; i++) {
    if(server.users[i].email == session.user.email) {
      match = true;
      break;
    }
  }
  if(!match) {
    redirect('/')
  }

  /* the server looks like this:
  {
    id: 'clylmkurl0000bxt1kjftp8o4',
    name: 'first server',
    createdAt: 2024-07-14T14:02:39.682Z
  }
  */

  const channels = await prisma.channel.findMany({
    where: {
      serverId: params.serverId
    },
    orderBy: {
      createdAt: "asc"
    }
  })

  /* channels looks like this:
  [
    {
      id: 'clylmlun10002bxt1bqhki00r',
      name: 'first server first channel',
      createdAt: 2024-07-14T14:03:26.173Z,
      serverId: 'clylmkurl0000bxt1kjftp8o4'
    },
    {
      id: 'clylmma470003bxt1zypw4pgh',
      name: 'first server second channel',
      createdAt: 2024-07-14T14:03:46.231Z,
      serverId: 'clylmkurl0000bxt1kjftp8o4'
    }
  ]
  
  It is a list containing channel objects of every channel within the server, ordered by createdAt - earliest first. 
  */

  let messages = []

  for (let i = 0; i < channels.length; i++) {
    messages[i] = await prisma.message.findMany({
      where: {
        channelId: channels[i].id
      },
      orderBy: {
        createdAt: "asc"
      }
    })
  }

  /* messages looks like this: 
  [
    [
      {
        id: 'clylmw9ox0002xgj082en20nd',
        content: 'second channel first message arthur',
        createdAt: 2024-07-14T14:11:32.242Z,
        channelId: 'clylmma470003bxt1zypw4pgh',
        userId: 'clylmjvg20001ybhhp0bw52ju'
      },
      {
        id: 'clylmwwja0003xgj00hpqn1qf',
        content: 'second channel second message arthur',
        createdAt: 2024-07-14T14:12:01.847Z,
        channelId: 'clylmma470003bxt1zypw4pgh',
        userId: 'clylmjvg20001ybhhp0bw52ju'
      }
    ],
    [
      {
        id: 'clylmurbt0000xgj07pzwlm89',
        content: 'first channel first message henry',
        createdAt: 2024-07-14T14:10:21.785Z,
        channelId: 'clylmlun10002bxt1bqhki00r',
        userId: 'clylmjeym0000ybhh1lw2x8or'
      },
      {
        id: 'clylmv8vi0001xgj0n0ahlpwn',
        content: 'first channel second message henry',
        createdAt: 2024-07-14T14:10:44.527Z,
        channelId: 'clylmlun10002bxt1bqhki00r',
        userId: 'clylmjeym0000ybhh1lw2x8or'
      }
    ]
  ]

  It is a list containing every one of the server's channels' messages.
  Channels are ordered by createdAt - most recent first.
  Each channel is a list containing all of its message objects ordered by createdAt - earliest first.

  ie: messages[1][0].content = "first channel first message henry"
  */

  return (
    <div className='h-screen w-screen overflow-hidden flex bg-disc-lgray'>
    <ServerList serverId={serverId}/>
    <ChannelList channels={channels} server={server} user={user}/>
    <Channel serverId={serverId} channelId={channelId} user={user}/>
    </div>
  )
}
