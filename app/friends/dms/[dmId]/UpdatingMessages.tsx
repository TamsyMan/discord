"use client"
import dateGenerator from '@/app/servers/[serverId]/channels/[channelId]/DateGenerator'
import React, { useState } from 'react'
import { io } from 'socket.io-client';

export default function UpdatingMessages(props: any) {
    const DirectChannel = props.DirectChannel;
    const user: any = props.user;

    const [clientMessages, setClientMessages] = useState<{}[]>([]);
    const [inputValue, setInputValue] = useState<string>();

    const socket = io('http://localhost:8080')

    function handleSubmit(formData: FormData) {
        const message = formData.get('newMessage')
        const now = Date();
        setInputValue('')
        if (message != '') {
            socket.emit('dmMessage', message, DirectChannel.id, user, now)
        }
    }

    socket.on('connect', () => {
        socket.emit('join-channel', String(DirectChannel.id))

        socket.on('dmMessage', (message: string, user: any, now: any) => {
            console.log("Client received a new message", message)
            setClientMessages([...clientMessages, { content: message, user: user, date: now }])
        })
    })


  return (
    <>
    <ul className='pb-20'> 
    {clientMessages.map((message: any) => 
        <li className='flex my-6' key={message.id}>
            <div className='min-w-10 h-full mr-4'>
                <img src={message.user.avatar} className='aspect-square w-10 rounded-full'/>
            </div>
            <div>
                <div className='flex items-center'>
                    <h3 className='mr-2 font-semibold'>{message.user.username}</h3>
                    <p className='text-xs text-disc-white'>{dateGenerator(message.date)}</p>
                </div>
                <div>{message.content}</div>
            </div>
        </li>
        )}
    </ul>
    <form action={handleSubmit} className=''>
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='text-white bg-disc-anothergray w-3/4 px-2 py-3 mb-4 rounded-lg fixed bottom-0' name='newMessage' placeholder="Message"/>
        <button type='submit' hidden/>
    </form>
    </>
  )
}
