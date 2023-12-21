"use client"

import qs from "query-string";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";

export function DeleteChannel(){
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();
    
    const isModalOpen = isOpen && type === "deleteChannel"
    const { channel, server } = data;

    const [isLoading, setIsLoading] = useState(false);

    async function handleClick(){
        try {
            setIsLoading(true)
            const url = qs.stringifyUrl({
              url: `/api/channels/${channel?.id}`,
              query: {
                serverId: server?.id
              }
            });
            await axios.delete(url);
            
            onClose();
            router.refresh();
            router.push(`/servers/${server?.id}`);
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false)
        }
    }
    
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="p=0 overflow-hidden">
                <DialogHeader className="pt=8 px-6">
                    <DialogTitle>
                        Delete Channel
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to do this? <br/>
                        <span className="text-indigo-500 font-semibold">#{channel?.name}</span> will be permanently deleted.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button
                            variant="ghost"
                            disabled={isLoading}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            disabled={isLoading}
                            onClick={handleClick}
                        >
                            confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}