import React from 'react'
import prisma from '@/app/db'
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/auth';
import offlineUser from '@/app/actions/offlineUser';
import toast, { Toaster } from 'react-hot-toast';

export default async function page() {
    const session = await auth();

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: String(session?.user?.email)
        },
        select: {
            id: true,
        }
    })

    

    async function createServer(formData: FormData) {
        "use server"
        const serverName = String(formData.get('serverName'))
        const serverIcon = String(formData.get('serverIcon'))

        if(serverName !== '') {
            if (serverIcon === '') {
                const newServer = await prisma.server.create({
                    data: {
                        name: serverName,
                        ownerId: user.id,
                        users: {
                            connect: {
                                id: user.id
                            }
                        }
                    }
                })

                console.log("New server created.")
        
                const newChannel = await prisma.channel.create({
                    data: {
                        name: "general",
                        serverId: newServer.id,
                    }
                })

                redirect(('/servers/' + newServer.id + '/channels/' + newChannel.id))
            
            } else {
                const newServer = await prisma.server.create({
                    data: {
                        name: serverName,
                        icon: serverIcon,
                        ownerId: user.id,
                        users: {
                            connect: {
                                id: user.id
                            }
                        }
                    }
                })


                console.log("New server created.")
        
                const newChannel = await prisma.channel.create({
                    data: {
                        name: "general",
                        serverId: newServer.id,
                    }
                })

                redirect(('/servers/' + newServer.id + '/channels/' + newChannel.id))
            }
        } else {
            toast.error('Server name cannot be empty.')
        }
      }

  return (
    <div className='absolute flex justify-center items-center w-screen h-screen bg-opacity-50 bg-black'>
        <Toaster />
        <div className='h-[30rem] w-[27rem] rounded-lg bg-disc-anothergray flex flex-col items-center'>
        <h2 className='mb-3 font-bold text-2xl p-4'>Create Your Server</h2>
        <p className="text-center text-disc-white mb-8 px-4">Give your new server a personality with a name and an icon. You can always change it later.</p>
        <form action={createServer} className='flex flex-col w-full h-full justify-between'>
            <div className='px-4'>
                <label className='text-xs font-semibold text-disc-white mb-1 ml-1'>SERVER NAME</label>
                <input name='serverName' className='w-full p-2 rounded-md bg-disc-mgray mb-4'/>
                <label className='text-xs font-semibold text-disc-white mb-1 ml-1'>SERVER ICON</label>
                <input name='serverIcon' className='w-full p-2 rounded-md bg-disc-mgray'/>
            </div>
            <div className='flex justify-between bg-disc-mgray py-6 px-8 rounded-b-lg'>
                <Link className='p-2' href="/">Back</Link>
                <button className='bg-disc-blue px-6 py-2 rounded-md font-semibold' type='submit'>Create</button>
            </div>
        </form>
        </div>
    </div>
  )
}
