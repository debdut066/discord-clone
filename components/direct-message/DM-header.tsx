'use client'

import { User } from "lucide-react"

import { Separator } from "../ui/separator"
import { cn } from "@/lib/utils"

interface DMHeader{
    type : string;
    setType : (e : string) => void
}

const actionBtnText = ['All', 'Pending', 'Blocked']

export default function DMHeader({ type, setType }: DMHeader){

    function handleRequest(e:any){
        setType(e.target.id)
    }

    return (
        <div className="text-md flex gap-x-3 px-2 py-3 items-center h-12 sm:h-8 border-neutral-200 dark:border-[#2d2e34] border-b-2">
            <span className="gap-x-2 flex">
                <User className="text-zinc-400"/>
                Friends
            </span>
            <Separator orientation="vertical" className="h-5 bg-zinc-300 dark:bg-zinc-700 rounded-md w-[2px] mx-auto"/>
            <div className="flex gap-x-5 w-full">
                {actionBtnText.map((text, idx)=>(
                    <button key={idx} id={text} className={cn(
                        "line-clamp-1 font-semibold rounded text-sm px-2 py-1 xs:py-0 text-zinc-500 hover:bg-zinc-600 hover:text-zinc-300 dark:text-zinc-400 dark:hover:text-zinc-300 transition",
                        type === text && "bg-zinc-600 dark:text-white"
                    )}
                        onClick={handleRequest}
                    >
                        {text}
                    </button>
                ))}
                <button
                    id="Add Friend"
                    className={cn(
                        "line-clamp-1 font-semibold rounded bg-[#258046] text-sm p-1 px-2 text-white  transition",
                        type === "Add Friend" && "bg-transparent dark:text-emerald-400"
                    )}
                    onClick={handleRequest}
                >
                    Add Friend
                </button>
            </div>
        </div>
    )
}
