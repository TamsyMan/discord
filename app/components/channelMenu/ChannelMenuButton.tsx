"use client"
import React from 'react';
import { RootState } from '@/app/globalRedux/store';
import { useSelector, useDispatch } from 'react-redux';
import { toggle } from '@/app/globalRedux/Features/channel/channelMenuSlice';
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from 'react-icons/rx';

export default function ChannelMenuButton() {
  const channelMenuState = useSelector((state: RootState) => state.channelMenu.value);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(toggle())} className='text-disc-white text-lg'>{channelMenuState ? <RxCross2/>: <IoIosArrowDown />}</button>
  )
}