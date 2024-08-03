"use client";

import React, { useState } from 'react'

export default function Tooltip(props: any) {
    const [isActive, setIsActive] = useState(false);

  return (
    <button className='relative' onClick={() => setIsActive(!isActive)}>
        {props.children}
        {isActive && (
            <div className='absolute z-50 left-[120%] top-1/2 -translate-y-1/2'>
                {props.content}
            </div>
        )}
    </button>
  )
}
