"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { DialogDescription } from "@radix-ui/react-dialog";

const formSchema = z.object({
    name : z.string().min(1, {
        message : "Server name is required."
    }),
    imageUrl : z.string().min(1, { 
        message : "Server image is required."
    })
})

export function EditServerModal(){
    const router = useRouter();
    const { isOpen, onClose, type, data } = useModal();

    const { server } = data;
    const isModal = isOpen && type === "editServer";

    const form = useForm({
        resolver : zodResolver(formSchema),
        defaultValues : {
            name : "",
            imageUrl : ""
        }
    })

    useEffect(() => {
        if(server){
            form.setValue("name", server.name);
            form.setValue("imageUrl", server.imageUrl)
        }
    },[server, form])

    const isLoading = form.formState.isSubmitting;

    function handleClose(){
        form.reset();
        onClose();
    }

    async function onSubmit(values : z.infer<typeof formSchema>){
        try{

            await axios.patch(`/api/servers/${server?.id}`, values);
            
            form.reset();
            router.refresh();
            onClose();

        }catch(error){
            console.log(error);
        }
    }

    return (
        <Dialog open={isModal} onOpenChange={handleClose}>
            <DialogContent className="p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogHeader className="text-2xl text-center">
                        <DialogTitle className="text-2xl text-center font-bold">
                            Customize your server
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="text-center">
                        Give your server a personality with a name and an image. You can always change it later.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="serverImage"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            className="flex items-center justify-center text-center"
                                        >
                                            Server name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="focus-visible:ring-0 focus-visible:ring-offset-0"
                                                placeholder="Enter server name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="px-6 py-4 flex item-center w-full">
                            <Button variant="primary" disabled={isLoading}>
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}