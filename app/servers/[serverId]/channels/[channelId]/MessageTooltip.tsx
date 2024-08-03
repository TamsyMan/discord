"use client";

import React from 'react'
import { MdBlock } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx'

export default function MessageTooltip(props: {avatar: string, name: string}) {
  return (
    <div>
        <div className='flex flex-col'>
            <div className='flex w-60 justify-between'>
                <img src={props.avatar} className='object-contain rounded-full w-12 aspect-square'/>
                <div className='py-0.5'>
                    <button className="text-red-500">
                      <MdBlock size={25}/>
                    </button>
                </div>
            </div>
            <p>{props.name}</p>
        </div>
    </div>
  )
}
