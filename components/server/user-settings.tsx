"use client"

import axios from "axios";
import { Profile } from "@prisma/client";
import React, { useEffect, useState } from "react";

import { MicOff , Mic, Settings, Headphones } from "lucide-react"
import { TbHeadphonesOff , TbHeadphones } from "react-icons/tb"

import { ActionTooltip } from "../action-tooltip";
import { UserAvatar } from "../user-avatar";

export function UserSettings(){
    const [profile, setProfile] = useState<null | Profile>(null);
    // const muteSound = new Audio('../../public/mute.mp3')

    useEffect(()=>{
        (async () => {
            const { data : myProfileData} = await axios.get('/api/users');
            setProfile(myProfileData);
        })()
    },[])

    async function ProfileUpdate(e : any){
        let name = e.target.id
        let reqBody = {
            name : name === "unmute" ? "mute" : name === "undeafen" ? "deafen" : name,
            value : name === "mute" ? true : name === "unmute" ? false : name === "deafen" ? true : false
        }
        // muteSound.play();
        try {
            const { data : response}  = await axios.patch(`/api/users/${profile?.id}`,reqBody);
            setProfile(response)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="flex flex-1 absolute bottom-0 bg-[#232428] w-full h-14 items-center justify-between px-2">
            <div className="flex gap-x-1 items-center">
                <UserAvatar
                    className="h-6 w-6"
                    src={profile?.imageUrl}
                />
                <span className="font-semibold">
                    <h4 className="text-xs">{profile?.name}</h4>
                    <p className="text-xs text-[#a0a5ad]">Online</p>
                </span>
            </div>
            <div className=" flex gap-x-3 items-center justify-center">
                <ActionTooltip label={profile?.mute ? "Unmute" : "mute"} side="top">
                    {   profile?.mute 
                        ? <MicOff id="unmute" className="h-[20px] w-[20px] text-red-600" onClick={ProfileUpdate}/> 
                        : <Mic id="mute" className="h-[20px] w-[20px]" onClick={ProfileUpdate}/>
                    }
                </ActionTooltip>
                <ActionTooltip label={ profile?.deafen ? "undeafen" : "defean"} side="top">
                    {   profile?.deafen 
                        ? <MicOff id="undeafen" className="h-[20px] w-[20px] text-red-600" onClick={ProfileUpdate}/> 
                        : <Headphones id="deafen" className="h-[20px] w-[20px]" onClick={ProfileUpdate}/>
                    }
                </ActionTooltip>
                <ActionTooltip label="User Settings" side="top">
                    <Settings className="h-[20px] w-[20px]"/>
                </ActionTooltip>
            </div>
        </div>
    )
}