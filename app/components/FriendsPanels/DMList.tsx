"use client"
import { RootState } from '@/app/globalRedux/store';
import React from 'react'
import { useSelector } from 'react-redux';
import DMAddList from './DMAddList';

export default function DMList(props: {user: any}) {
    const user = props.user;
    const dmState = useSelector((state: RootState) => state.dm.value);

  return (
    <ul className='flex flex-col'>
        {dmState ? 
        <div className='flex flex-col bg-disc-dgray rounded-lg p-1'>
            <h1 className='pl-1 font-semibold text-lg'>Select friends</h1>
            <p className='text-disc-white pl-1 text-sm'>You can add up to 9</p>
            <DMAddList user={user}/>
        </div>
         :
         user.DirectChannel.map((dm: any) => (
            <a href={"/friends/dms/" + dm.id} key={dm.id} className='flex items-center p-1 hover:bg-disc-lgray rounded-lg'>
                <img src={dm.icon} className='w-10 aspect-square object-cover rounded-full'/>
                <p className='ml-2'>{dm.users.map((user: any, key: number) => 
                    { if(key !== 0) {
                        return ', ' + user.username
                    } else {
                        return user.username;
                    }}
                    )}</p>
            </a>
        ))
        }
    </ul>
  )
}
