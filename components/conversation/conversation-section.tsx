"use client"

import { cn } from "@/lib/utils";
import { User, Store } from "lucide-react"
import { useParams } from "next/navigation"

interface ConversationSectionProps{
    channel : string
}

export function ConversationSection({ channel }: ConversationSectionProps){
    const params = useParams();

    return (
        <button
            className={cn(
                "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
                params?.channelId === channel && "bg-zinc-700/20 dark:bg-zinc-700"
            )}
        >
            { channel === "%40me" ?
                <User className="flex-shrink-0 w-5 h-5 text-zinc-200 dark:text-zinc-200"/>
                :
                <Store className="flex-shrink-0 w-5 h-5 text-zinc-200 dark:text-zinc-200"/>

            }
            <p
                className={cn(
                    "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
                    params?.channelId === channel && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
                )}
            >
                {channel === "%40me" ? "Friends" : channel }
            </p>
        </button>
    )
}