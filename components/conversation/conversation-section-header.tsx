import { Plus } from "lucide-react";

import { ActionTooltip } from "../action-tooltip";

export function ConversationSeactionHeader(){
    return (
        <div className="flex items-center justify-between py-2">
            <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                direct messages
            </p>
            <ActionTooltip label="Create DM" side="top">
                <button 
                    className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                    // onClick={() => onOpen("createChannel", { channelType })}
                >
                    <Plus className="h-4 w-4"/>
                </button>
            </ActionTooltip>
        </div>
    )
}