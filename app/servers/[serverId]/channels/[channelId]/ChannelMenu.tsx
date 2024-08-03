"use client"

import { RootState } from '@/app/globalRedux/store';
import Link from 'next/link';
import React from 'react'
import { FaGem, FaShieldAlt } from 'react-icons/fa';
import { MdOutlineAddReaction } from "react-icons/md";
import { TbSettings } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { RiRobot3Line } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { FaBell, FaPencil } from "react-icons/fa6";
import { IoMdExit } from 'react-icons/io';

export default function ChannelMenu(props: any) {
    const channels = props.channels;
    const server = props.server;

    const channelMenuState = useSelector((state: RootState) => state.channelMenu.value);
  
    return (
    <div className='px-3 py-4'>
    {channelMenuState ? 
    <ul className='bg-gray-950 w-full p-1 rounded-lg text-disc-white'>
        <Link href={"/servers/" + server.id + "/boost"}>
            <ul className='flex justify-between px-2 py-1 items-center'>
                <li>Server Boost</li>
                <li><FaGem /></li>
            </ul>
        </Link>
        <hr className='border-disc-black mx-1.5'></hr>
        <ul className='flex justify-between px-2 py-1 items-center'>
            <li>Invite People</li>
            <li><MdOutlineAddReaction /></li>
        </ul>
        <Link href={"/servers/" + server.id + "/settings"}>
            <ul className='flex justify-between px-2 py-1 items-center'>
                <li>Server Settings</li>
                <li><TbSettings /></li>
            </ul>
        </Link>
        <ul className='flex justify-between px-2 py-1 items-center'>
            <li>Create Event</li>
            <li><SlCalender /></li>
        </ul>
        <ul className='flex justify-between px-2 py-1 items-center'>
            <li>App Directory</li>
            <li><RiRobot3Line /></li>
        </ul>
        <hr className='border-disc-black mx-1.5'></hr>
        <ul className='flex justify-between px-2 py-1 items-center'>
            <li>Notification Settings</li>
            <li><FaBell /></li>
        </ul>
        <ul className='flex justify-between px-2 py-1 items-center'>
            <li>Privacy Settings</li>
            <li><FaShieldAlt /></li>
        </ul>
        <hr className='border-disc-black mx-1.5'></hr>
        <Link href={"/servers/" + server.id + "/profile"}>
            <ul className='flex justify-between px-2 py-1 items-center'>
                <li>Edit Server Profile</li>
                <li><FaPencil /></li>
            </ul>
        </Link>
        <ul className='flex justify-between px-2 py-1 items-center'>
            <li>Hide Muted Channels</li>
            <li className='mr-[1px]'><input name='checkbox' className='accent-disc-black' type='checkbox'/></li>
        </ul>
        <hr className='border-disc-black mx-1.5'></hr>
        <ul className='flex justify-between px-2 py-1 items-center text-red-600'>
            <li>Leave Server</li>
            <li><IoMdExit /></li>
        </ul>
    </ul>
    :
    <ul>
        {channels.map((channel: any) => (
            <Link key={channel.id} className='flex overflow-hidden my-2 items-center' href={"/servers/" + server.id + "/channels/" + channel.id}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z" fill="#B9BBBE"/> </svg>
            <p className='ml-1'>{channel.name}</p>
            </Link>
        ))}       
    </ul>
    }
    </div>
  )
}
