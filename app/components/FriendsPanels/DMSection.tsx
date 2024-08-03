import prisma from '@/app/db';
import React from 'react'
import DmAddButton from './DmAddButton';
import DMList from './DMList';

export default async function DMSection(props: {userId: string}) {

    const userId = props.userId;

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId
        },
        include: {
            DirectChannel: {
                include: {
                    users: {
                        omit: {
                            password: true,
                        }
                    },
                    messages: {
                        include: {
                            user: true,
                        }
                    }
                }
            },
            friends: {
                omit: {
                    password: true,
                }
            }
        }
    })

  return (
    <div className='max-w-full'>
    <div className='flex justify-between items-center p-1'>
        <p className='text-xs text-disc-white'>DIRECT MESSAGES</p>
        <DmAddButton/>
    </div>
    <DMList user={user}/>
    </div>
  )
}
