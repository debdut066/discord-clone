"use client"

import { ServerWithMemberWithProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { ActionTooltip } from "../action-tooltip";
import { Button } from "../ui/button";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerSectionProps{
    label : string;
    role? : MemberRole;
    sectionType : "channels" | "members";
    channelType? : ChannelType;
    server?: ServerWithMemberWithProfiles;  
}

export function ServerSection({
    label,
    role,
    sectionType,
    channelType,
    server
} : ServerSectionProps){

    let { onOpen }= useModal();

    return (
        <div className="flex items-center justify-between py-2">
            <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                {label}
            </p>
            {role !== MemberRole.GUEST && sectionType === "channels" && (
                <ActionTooltip label="create channel" side="top">
                    <Button 
                        variant="ghost"
                        className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                        onClick={() => onOpen("createChannel", { channelType })}
                    >
                        <Plus className="h-4 w-4"/>
                    </Button>
                </ActionTooltip>
            )}
            {role === MemberRole.ADMIN && sectionType === "members" && (
                <ActionTooltip label="Manage Members" side="top">
                    <Button 
                        variant="ghost"
                        className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                        onClick={() => onOpen("members", { server })}
                    >
                        <Settings className="h-4 w-4"/>
                    </Button>
                </ActionTooltip>
            )}
        </div>
    )
}