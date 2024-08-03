"use client"

import Link from 'next/link'
import React from 'react'

export default function Error() {

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <h1 className='mt-8 text-2xl'>Incorrect credentials.</h1>
      <Link className='bg-disc-mgray px-4 py-2 text-2xl mt-4 rounded text-disc-blue' href={'/api/auth/signin'}>Login</Link>
    </div>
  )
}
