import React from 'react'

import ConversationSideBar from '@/components/conversation/conversation-sidebar'

export default function FriendsLayout({ children }:{ children : React.ReactNode}) {
    return (
        <div className='h-full'>
            <div className='hidden md:flex h-full w-60 flex-col fixed inset-y-0'>
                <ConversationSideBar/>
            </div>
            <main className='h-full md:pl-60'>
                {children}
            </main>
        </div>
    )
}