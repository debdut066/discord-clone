"use client"

import { useState, useEffect } from "react"
import { CreateServerModal } from "../modals/create-server-modal"
import { InviteModal } from "../modals/invite-modal";
import { EditServerModal } from "../modals/edit-server-modal";
import { MembersModal } from "../modals/members-modal";
import { CreateChannel } from "../modals/create-channel";
import { EditChannel } from "../modals/edit-channel-modal";
import { DeleteChannel } from "../modals/delete-channel-modal";
import { DeleteServerModal } from "../modals/delete-server-modal";
import { MessageFileModal } from "../modals/message-file-modal";
import { DeleteMessageModal } from "../modals/delete-message-modal";
import { JoinServer } from "../modals/join-server-modal";
import { LeaveServer } from "../modals/leave-server-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null;
    }

    return (
        <>
            <JoinServer/>
            <EditChannel/>
            <LeaveServer/>
            <InviteModal/>
            <MembersModal/>
            <CreateChannel/>
            <DeleteChannel/>
            <EditServerModal/>
            <MessageFileModal/>
            <CreateServerModal/>
            <DeleteServerModal/>
            <DeleteMessageModal/>
        </>
    )
}