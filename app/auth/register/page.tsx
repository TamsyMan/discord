import registerUser from '@/app/actions/registerUser'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
      <div className='flex justify-center items-center w-screen h-screen bg-disc-mgray'>
        <div>
          <form action={registerUser} className='text-white flex flex-col bg-disc-dgray p-4 w-96 rounded-lg'>
              <input name='username' type='text' placeholder='Username' className='bg-disc-anothergray px-3 py-2 mb-2 rounded-lg'/>
              <input name='email' type='email' placeholder='Email' className='bg-disc-anothergray px-3 py-2 mb-2 rounded-lg'/>
              <input name='password' type='password' placeholder='Password' className='bg-disc-anothergray px-3 py-2 mb-2 rounded-lg'/>
              <button type='submit' className='w-full bg-disc-blue py-1.5 rounded-lg text-xl font-semibold'>Register</button>
              <Link href="/api/auth/signin" className='w-full flex justify-center pt-2.5'>
                <p>Already have an account?</p>&nbsp;
                <p className='text-disc-blue'>Login</p>
              </Link>
          </form>
        </div>
      </div>
  )
}
