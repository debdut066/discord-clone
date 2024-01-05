"use client"

import { ServerWithMemberWithProfiles } from "@/types"
import { MemberRole } from "@prisma/client"
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react";

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
    server : ServerWithMemberWithProfiles;
    role? : MemberRole;
}

export function ServerHeader({ server, role }: ServerHeaderProps) {
    const { onOpen } = useModal()

    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = role === MemberRole.MODERATOR;

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="focus:outline-none" >
                <Button
                    className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
                    variant="ghost"
                >
                    {server.name}
                    <ChevronDown className="h-5 w-5 ml-auto" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px"
            >
                <DropdownMenuItem
                    className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
                    onClick={() => onOpen("invite", { server })}
                >
                    Invite People
                    <UserPlus className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>

                { isAdmin && (
                    <DropdownMenuItem
                        className="px-3 py-2 text-sm cursor-pointer"
                        onClick={() => onOpen("editServer", { server })}
                    >
                        Server Settings
                        <Settings className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}

                { isAdmin && (
                    <DropdownMenuItem
                        className="px-3 py-2 text-sm cursor-pointer"
                        onClick={() => onOpen("members", { server })}
                    >
                        Manage Members
                        <Users className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}

                {isAdmin && isModerator && (
                    <DropdownMenuItem
                        className="px-3 py-2 text-sm cursor-pointer"
                        onClick={() => onOpen("createChannel", { server })}
                    >
                        Create Channel
                        <PlusCircle className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}

                {isAdmin && (
                    <DropdownMenuItem
                        className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
                        onClick={() => onOpen("deleteServer", { server })}
                    >
                        Delete Server
                        <Trash className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                { !isAdmin && <DropdownMenuSeparator/>}
                { !isAdmin && (
                    <DropdownMenuItem
                        className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
                        onClick={() => onOpen("leaveServer", { server })}
                    >
                        Leave Server
                        <LogOut className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}