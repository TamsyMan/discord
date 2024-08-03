import React from 'react'
import StaticMessages from './StaticMessages'
import UpdatingMessages from './UpdatingMessages'

export default function Channel(props: any) {
    const DirectChannel = props.DirectChannel;
    const user: any = props.user;

  return (
    <div>
        <StaticMessages directChannelId={DirectChannel.id}/>
        <UpdatingMessages DirectChannel={DirectChannel} user={user}/>
    </div>
  )
}
