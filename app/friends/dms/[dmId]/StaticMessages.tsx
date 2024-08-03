"use server"
import prisma from '@/app/db';
import React from 'react'
import dateGenerator from '@/app/servers/[serverId]/channels/[channelId]/DateGenerator';
import Tooltip from '@/app/components/Tooltip';

export default async function StaticMessages(props: any) {
    const directChannelId = props.directChannelId;

    const channel = await prisma.directChannel.findUniqueOrThrow({
        where: {
            id: String(directChannelId)
        },
        include: {
            messages: {
                include: {
                    user: true
                },
                orderBy: {
                    createdAt: "desc"
                },
                take: 50,
            }
        }
    })

    const messages = channel.messages.reverse()
    
    return (
        <ul>
            {messages.map((message: any) => 
                <li className='flex my-6' key={message.id}>
                    <div className='min-w-10 h-full mr-4'>
                        <img src={message.user.avatar} className='aspect-square w-10 rounded-full'/>
                    </div>
                    <div>
                        <div className='flex items-center'>
                            <h3 className='mr-2 font-semibold'>{message.user.username}</h3>
                            <p className='text-xs text-disc-white'>{dateGenerator(message.createdAt)}</p>
                        </div>
                        <div>{message.content}</div>
                    </div>
                </li>
            )}
        </ul>
    )
}