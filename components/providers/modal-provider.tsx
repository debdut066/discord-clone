"use client"

import { useState, useEffect } from "react"
import { CreateServerModal } from "../modals/create-server-modal"
import { InviteModal } from "../modals/invite-modal";
import { EditServerModal } from "../modals/edit-server-modal";
import { MembersModal } from "../modals/members-modal";
import { CreateChannel } from "../modals/create-channel";
import { EditChannel } from "../modals/edit-channel";
import { DeleteChannel } from "../modals/delete-channel";
import { DeleteServerModal } from "../modals/delete-modal";

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
            <CreateServerModal/>
            <InviteModal/>
            <EditServerModal/>
            <MembersModal/>
            <CreateChannel/>
            <DeleteServerModal/>
            <EditChannel/>
            <DeleteChannel/>
        </>
    )
}