"use client"

import axios from "axios"
import qs from "query-string";
import { 
  Check,
  Gavel,
  Loader2,
  MoreVertical, 
  Shield, 
  ShieldAlert, 
  ShieldCheck,
  ShieldQuestion
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { ScrollArea } from "../ui/scroll-area";
import { UserAvatar } from "../user-avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuTrigger,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ServerWithMemberWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";

const roleIconMap = {
    "GUEST" : null,
    "MODERATOR" : <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500"/>,
    "ADMIN" : <ShieldAlert className="h-4 w-4 text-rose-500"/>
}

export function MembersModal(){
    const router = useRouter();
    const { onOpen, isOpen, onClose, type, data }  = useModal();
    const [loadingId, setLoadingId] = useState("");

    const { server } = data as { server : ServerWithMemberWithProfiles};
    const isModal = isOpen && type === "members";

    function onKick(memberId : string){

    }

    async function onRoleChange(memberId : string, role : MemberRole){
        try {
            setLoadingId(memberId)
            const url = qs.stringify({
                url : `/api/members/${memberId}`,
                query : {
                    serverId : server?.id
                }
            })

            const response = await axios.patch(url, { role })
            console.log("response", response.data)
            router.refresh();
            onOpen("members", { server: response.data });
        } catch (error) {
            console.log(error);
        } finally{
            setLoadingId("");
        }
    }

    return(
        <Dialog open={isModal} onOpenChange={onClose}>
            <DialogContent className="p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Manage Members
                    </DialogTitle>
                    <DialogDescription 
                        className="text-center text-zinc-500"
                    >
                        {server?.members?.length} Members
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-8 max-h-[420px]">
                    {server?.members?.map((member) => (
                        <div key={member.id} className="flex items-center gap-x-2 m-6">
                            <UserAvatar src={member.profile.imageUrl}/>
                            <div className="flex flex-col gap-y-1">
                                <div className="text-xs font-semibold flex items-center gap-x-1">
                                    {member?.profile?.name}
                                    {roleIconMap[member?.role]}
                                </div>
                                <p className="text-xs">
                                    {member.profile.email}
                                </p>
                            </div>
                            {server.profileId !== member.profileId && loadingId !== member.id && (
                                <div className="ml-auto">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                    <MoreVertical className="h-4 w-4 text-zinc-500" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent side="left">
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger
                                        className="flex items-center"
                                        >
                                        <ShieldQuestion
                                            className="w-4 h-4 mr-2"
                                        />
                                        <span>Role</span>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuItem
                                                    onClick={() => onRoleChange(member.id, "GUEST")}
                                                >
                                                    <Shield className="h-4 w-4 mr-2" />
                                                    Guest
                                                    {member.role === "GUEST" && (
                                                        <Check
                                                        className="h-4 w-4 ml-auto"
                                                        />
                                                    )}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => onRoleChange(member.id, "MODERATOR")}
                                                >
                                                    <ShieldCheck className="h-4 w-4 mr-2" />
                                                    Moderator
                                                    {member.role === "MODERATOR" && (
                                                        <Check
                                                        className="h-4 w-4 ml-auto"
                                                        />
                                                    )}
                                                </DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => onKick(member.id)}
                                    >
                                        <Gavel className="h-4 w-4 mr-2" />
                                        Kick
                                    </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                </div>
                            )}
                            {loadingId === member.id && (
                                <Loader2
                                    className="animate-spin ml-auto w-4 h-4"
                                />
                            )}
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}