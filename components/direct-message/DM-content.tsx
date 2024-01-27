"use client"

import axios from "axios";
import { Search } from "lucide-react"
import { Check, Plus, MessageCircle } from 'lucide-react';
import { HiDotsHorizontal } from "react-icons/hi";

import { Input } from "../ui/input"
import { Separator } from "../ui/separator"
import { UserAvatar } from "../user-avatar"
import { ActionTooltip } from "../action-tooltip";

interface DMContentProps{
    data : [];
    type : string;
}

export default function DMContent({ data, type } : DMContentProps){
    
    async function handlePending(friendRequestId: string){
        const result = await axios.patch(`/api/friendRequest/${friendRequestId}`);
        console.log(result)
    }

    return (
        <div className="flex flex-col items-center space-y-5 px-10 py-5 w-full max-w-3xl h-full">
            <div className="flex justify-between px-2 rounded-lg items-center w-full h-fit dark:bg-[#1e1f23]">
                <Input 
                    value="" 
                    className="bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
                    placeholder="Search" 
                    onChange={()=>{}}
                />
                <Search/>
            </div>

            <div className="h-full w-full flex flex-col">
                <p className="h-fit text-xs font-semibold uppercase dark:text-zinc-400">{type} - {data.length}</p>
                <Separator className="h-[1px] w-[98%] mt-5 bg-zinc-300 dark:bg-zinc-700 rounded-md mx-auto"/>
            
                {type === "Pending" && (
                    <div className=" h-full w-full">
                        {data?.map((friends:any)=>(
                            <div className="flex items-center px-2 py-1 rounded-md justify-between hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition" key={friends.id}>
                                <div className="flex items-center gap-x-2 p-2">
                                    <UserAvatar src={friends.from.imageUrl}/>
                                    <span className="font-semibold">
                                        <h4 className="text-sm">{friends.from.name}</h4>
                                        <p className="text-xs text-[#a0a5ad]">Incoming Friend Request</p>
                                    </span>
                                </div>

                                <div className="flex gap-x-2">
                                    <ActionTooltip label="Accept" side="top">
                                        <button className="flex h-30 w-30 p-2 rounded-full bg-[#2b2d30]" onClick={()=>handlePending(friends.id)}>
                                            <Check className="hover:text-emerald-500"/>
                                        </button>
                                    </ActionTooltip>

                                    <ActionTooltip label="Ignore" side="top">
                                        <div className="flex h-30 w-30 p-2 rounded-full bg-[#2b2d30]">
                                            <Plus className="rotate-45 hover:text-red-500"/>
                                        </div>
                                    </ActionTooltip>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {type === "All" && (
                    <div className=" h-full w-full">
                        {data?.map((friends:any)=>(
                            <div className="flex items-center px-2 py-1 rounded-md justify-between hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition" key={friends.id}>
                                <div className="flex items-center gap-x-2 p-2">
                                    <UserAvatar src={friends.from.imageUrl}/>
                                    <span className="font-semibold">
                                        <h4 className="text-sm">{friends.from.name}</h4>
                                        <p className="text-xs text-[#a0a5ad]">Incoming Friend Request</p>
                                    </span>
                                </div>

                                <div className="flex gap-x-2">
                                    <ActionTooltip label="Accept" side="top">
                                        <div className="flex h-30 w-30 p-2 rounded-full bg-[#2b2d30]">
                                            <MessageCircle className="hover:text-slate-200"/>
                                        </div>
                                    </ActionTooltip>

                                    <ActionTooltip label="Ignore" side="top">
                                        <div className="flex h-30 w-30 p-2 rounded-full bg-[#2b2d30]">
                                            <HiDotsHorizontal />
                                        </div>
                                    </ActionTooltip>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}