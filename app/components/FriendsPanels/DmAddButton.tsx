"use client"
import React from 'react';
import { RootState } from '@/app/globalRedux/store';
import { useSelector, useDispatch } from 'react-redux';
import { toggle } from '@/app/globalRedux/Features/dm/addDmSlice';
import { FaPlus } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';

export default function DmAddButton() {
  const dmState = useSelector((state: RootState) => state.dm.value);
  const dispatch = useDispatch();

  return (
    <>
    <button onClick={() => dispatch(toggle())} className='text-disc-white text-lg'>{dmState ? <RxCross2/>: <FaPlus/>}</button>
    </>
  )
}
