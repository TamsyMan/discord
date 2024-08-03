"use client"

import React from 'react'
import Link from 'next/link';
import UserPanel from './UserPanel';
import ChannelMenuButton from '@/app/components/channelMenu/ChannelMenuButton';
import ChannelMenu from './ChannelMenu';

export default function ChannelList(props: any) {
  
    const channels = props.channels;
    const server = props.server;
    const user = props.user;
  
    return (
      <div className='h-screen w-72 bg-disc-mgray flex flex-col justify-between'>
        <div>
          <div className='p-3 flex justify-between'>
            <p className='font-semibold'>{server.name}</p>
            <ChannelMenuButton/>
          </div>
          <hr className='border-disc-black'/>
          <ChannelMenu server={server} channels={channels}/>
        </div>
        <UserPanel user={user}/>
      </div>
  )
}
