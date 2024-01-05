"use client"

import { ActionTooltip } from "@/components/action-tooltip"
import { MessageSquare } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function NavigateToDirectMessage(){
    const router = useRouter();

    function navigateToMessage(){
        router.push(`/channels/@me`)
    }

    return (
        <ActionTooltip
            side="right"
            align="center"
            label="Direct Messages"
        >
            <button
                onClick={navigateToMessage}
                className="group flex-center"
            >
                 <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-indigo-500">
                    <MessageSquare
                        className="group-hover:text-white transition"
                        size={25}
                    />
                </div>
            </button>
        </ActionTooltip>
    )
}