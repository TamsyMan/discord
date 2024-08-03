import Link from 'next/link'
import React from 'react'
import { FaUserFriends } from 'react-icons/fa'
import AuthButton from '../AuthButton/AuthButton.server'

export default function Navbar() {
  return (
    <>
      <nav className='w-full flex justify-between py-4 px-5'>
          <div className='flex'>
            <FaUserFriends size={24}/>
            <p className='font-semibold mx-3'>Friends</p>
            <div className='h-full border-l-2 border-disc-black rounded-lg'/>
            <Link href="/friends/online" className='ml-3 text-disc-white hover:bg-disc-anothergray px-2 rounded-lg hover:text-white'>Online</Link>
            <Link href="/friends/all" className='ml-3 text-disc-white hover:bg-disc-anothergray px-2 rounded-lg hover:text-white'>All</Link>
            <Link href="/friends/pending" className='ml-3 text-disc-white hover:bg-disc-anothergray px-2 rounded-lg hover:text-white'>Pending</Link>
            <Link href="/friends/blocked" className='ml-3 text-disc-white hover:bg-disc-anothergray px-2 rounded-lg hover:text-white'>Blocked</Link>
            <Link href="/friends/add" className='ml-3 text-white px-2 rounded-md bg-green-700'>Add Friend</Link>
          </div>
          <Link href="/api/auth/signout">Sign Out</Link>
      </nav>
      <hr className='border-disc-black'/>
    </>
  )
}
