"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useModal } from "@/hooks/use-modal-store";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Button } from "../ui/button";
import router from "next/router";
import axios from "axios";

const formSchema = z.object({
    link : z.string().min(1, {
        message : "Please enter a valid invite link or invite code"
    })
});


export function JoinServer(){
    const { isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === "joinServer";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          link: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    async function onSubmit(values : z.infer<typeof formSchema>){
        try {
            const urlString = values.link;
            const segments = urlString.split('/');
            const inviteCode = segments[segments.length - 1];
            const { data : server } = await axios.patch(`/api/servers/join/${inviteCode}`);
            
            form.reset();
            router.push(`/servers/${server.id}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] dark:bg-[#323338]">
                <DialogHeader>
                    <DialogTitle>
                        Join Server
                    </DialogTitle>
                    <DialogDescription>
                        Enter an invite below to join an existing server
                    </DialogDescription>
                </DialogHeader>
                <Form {...form} >
                    <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4 px-6">
                            <FormField
                                control={form.control}
                                name="link"
                                render={({ field })=>((
                                    <FormItem>
                                        <FormLabel className="uppercase">
                                            invite link *
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="dark:bg-[#43434b] focus-visible:ring-0 focus-visible:ring-offset-0"
                                                placeholder="https://discord.gg/hTKzmak"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                ))}
                            />
                        </div>
                        <DialogFooter className="px-6 py-4 dark:[#2c2d31]">
                            <Button variant="primary" disabled={isLoading}>
                                Join Server
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )

}