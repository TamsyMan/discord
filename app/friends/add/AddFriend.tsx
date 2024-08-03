"use client"

import addFriend from '@/app/actions/addFriend'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function AddFriend(props: { userEmail: string, userName: string }) {
    const userEmail = props.userEmail;
    const userName = props.userName;
    const addFriendWithId = addFriend.bind(null, userEmail, userName);
    
    async function submitHandler(formdata: FormData) {
      const result = await addFriendWithId(formdata)
      if (result?.error) {
        toast.error(result.error.message)
      }
    }

  return (
    <>
    <div><Toaster/></div>
    <form action={submitHandler} className='mt-4 w-full flex justify-between items-center'>
        <input name='input' className='px-2 bg-disc-black font-light rounded-lg w-full p-2 mr-3' placeholder='You can add friends with their Discord usernames.' />
        <button type='submit' className='bg-disc-blue p-2 rounded-lg min-w-max'>Send Friend Request</button>
    </form>
    </>
  )
}
