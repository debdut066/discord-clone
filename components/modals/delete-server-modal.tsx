
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";

export function DeleteServerModal(){
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)

    const isModalOpen = isOpen && type === "deleteServer";
    const { server } = data;

    async function deleteServer(){
        try {
            setIsLoading(true)
            await axios.delete(`/api/servers/${server?.id}`);
            onClose();
            router.refresh();
            router.push("/")
        } catch (error) {
            console.log(error);   
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center">
                        Delete Server
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Are you sure you want to delete this server ? <br/>
                        <span>{server?.name}</span> will be permanently deleted.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button
                            onClick={onClose}
                            variant="ghost"
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={deleteServer}
                            disabled={isLoading}
                        >
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}