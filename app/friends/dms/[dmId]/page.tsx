import prisma from '@/app/db';
import { PiPhoneCallFill } from "react-icons/pi";
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import StaticMessages from './StaticMessages';
import UpdatingMessages from './UpdatingMessages';
import Channel from './Channel';

export default async function page({ params }: { params: { dmId: string } }) {
    const dmId = params.dmId;

    const session = await auth();

    if (!session || !session.user) {
        redirect('/')
    }

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: String(session?.user?.email)
        },
        omit: {
            password: true,
        },
    })

    const DirectChannel = await prisma.directChannel.findUniqueOrThrow({
        where: {
            id: dmId
        },
        include: {
            users: {
                omit: {
                    password: true,
                }
            },
            messages: {
                include: {
                    user: {
                        omit: {
                            password: true,
                        }
                    
                    }
                }
            }
        }
    })

    let userCoutner = 0;

  return (
    <div className='h-screen w-full flex flex-col justify-between'>
        <div>
        <nav className='w-full flex py-3'>
            <div className='ml-3 px-2 flex items-center justify-between w-full'>
                <div className='flex items-center'>
                    <img src={DirectChannel.users[0].avatar} className='w-8 aspect-square rounded-full mr-2'/>
                    {DirectChannel.users.map(user => {
                        if(userCoutner === 0) {
                            userCoutner++;
                            return <p key={user.id} className='font-semibold text-lg'>{user.username}</p>;
                        } else return <p key={user.id} className='font-semibold text-lg'>, {user.username}</p>
                    })}
                </div>
                <PiPhoneCallFill size={30} fill='#B9BBBE' className='mr-2'/>
            </div>
        </nav>
        <hr className='border-disc-black'/>
        </div>
        <div className='overflow-y-auto px-3 flex flex-col-reverse'>
            <Channel DirectChannel={DirectChannel} user={user}/>
        </div>
    </div>
  )
}