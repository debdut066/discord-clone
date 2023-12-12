"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import axios from "axios";

export function InviteModal() {
    const { onOpen, isOpen, onClose, type, data } = useModal()
    const { server } = data;
    const isModal = isOpen && type === "invite";

    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    function copy(){
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);

        setTimeout(()=>{
            setCopied(false);
        },1000);

    }

    async function onNew() {
        try{
            setIsLoading(true);
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);

            onOpen("invite", { server : response.data });
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isModal} onOpenChange={onClose}>
            <DialogContent className="p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center"> 
                        Invite friends to {server?.name}
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label className="text-s">
                        Share this link with others to grant access to this server
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input
                            disabled={false}
                            className="focus-visible:ring-0 focus-visible:ring-offset-0"
                            readOnly
                            value={inviteUrl}
                        />

                        <Button
                            size="icon"
                            disabled={isLoading}
                            onClick={copy}
                        >
                            {copied 
                                ? <Check className="w-4 h-4"/>
                                : <Copy className="w-4 h-4"/>
                            }
                        </Button>
                    </div>
                    <Button
                        onClick={onNew}
                        disabled={isLoading}
                        variant="link"
                        size="sm"
                        className="text-xs mt-4"
                    >
                        Generate a new link
                        <RefreshCw className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

