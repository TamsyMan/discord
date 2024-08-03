"use client"
import newDm from '@/app/actions/newDm';
import React, { useState } from 'react'

export default function DMAddList(props: {user: any}) {
    const friends = props.user.friends;
    const newDmWithUserId = newDm.bind(null, props.user.id);

    const [search, setSearch] = useState('');

    const filteredFriends = friends.filter((friend: any) => {
        return friend.username.toLowerCase().includes(search.toLowerCase());
    })

  return (
    <div className='flex flex-col'>
        <input className='bg-disc-anothergray rounded-md my-2 w-40 place-self-center' onChange={(e) => setSearch(e.target.value)} placeholder=' Search for a friend'/>
        <form className='flex flex-col w-40 mx-auto' action={newDmWithUserId}>
            {filteredFriends.map((friend: any) => (
                <div className='flex justify-between items-center m-2' key={friend.id}>
                    <div className='flex items-center'>
                        <img src={friend.avatar} className='rounded-full aspect-square w-8'/>
                        <p className='ml-1.5 font-semibold'>{friend.username}</p>
                    </div>
                    <input name={friend.id} type='checkbox' className='justify-self-end accent-disc-black' />
                </div>
            ))}
            <button type='submit' className='bg-disc-blue w-40 rounded-lg my-1 py-0.5 font-semibold'>Create DM</button>
        </form>
    </div>
  )
}
