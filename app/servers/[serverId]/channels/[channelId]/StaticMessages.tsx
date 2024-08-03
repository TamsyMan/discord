import prisma from '@/app/db';
import React from 'react'
import dateGenerator from './DateGenerator';
import Tooltip from '@/app/components/Tooltip';
import MessageTooltip from './MessageTooltip';

export default async function StaticMessages(props: any) {
    const channelId = props.channelId;

    const channel = await prisma.channel.findUniqueOrThrow({
        where: {
            id: String(channelId)
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
        <ul className='pr-4'>
            {messages.map((message: any) => 
            <li className='' key={message.id}>
                <Tooltip content={<MessageTooltip avatar={message.user.avatar} name={message.user.username}/>}>
                    <div className='flex mt-6'>
                        <div className='min-w-10 h-full mr-4'>
                            <img src={message.user.avatar} className='aspect-square w-10 rounded-full'/>
                        </div>
                        <div>
                            <div className='flex items-center'>
                                <h3 className='mr-2 font-semibold'>{message.user.username}</h3>
                                <p className='text-xs text-disc-white'>{dateGenerator(message.createdAt)}</p>
                            </div>
                            <div className='float-left'>{message.content}</div>
                        </div>
                    </div>
                </Tooltip>
            </li>
            )}
            <li>
            </li>
        </ul>
    )
}
