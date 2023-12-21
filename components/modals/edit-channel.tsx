"use client"

import * as z from "zod";
import qs from "query-string";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { ChannelType } from "@prisma/client";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";

const formSchema = z.object({
    name : z.string().min(1, {
        message : "Channel name is required"
    }).refine(
        name => name !== "general",
        {
            message : "Channel name cannot be 'general'"
        }    
    ),
    type : z.nativeEnum(ChannelType)
});


export function EditChannel(){
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();
    const params = useParams();

    const isModalOpen = isOpen && type === "editChannel"
    const { channel, server } = data;

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          type: channel?.type || ChannelType.TEXT,
        }
    });

    useEffect(()=>{
        if(channel){
            form.setValue("name", channel.name);
            form.setValue("type", channel.type)
        }
    },[form, channel])

    const isLoading = form.formState.isSubmitting;

    async function onSubmit(values : z.infer<typeof formSchema>){
        try {
            const url = qs.stringifyUrl({
              url: `/api/channels/${channel?.id}`,
              query: {
                serverId: params?.serverId
              }
            });
            await axios.patch(url, values);
      
            form.reset();
            router.refresh();
            onClose();
        } catch (error) {
            console.log(error);
        }
    }

    function handleClose(){
        form.reset();
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit Channel
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4 px-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Channel Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="focus-visible:ring-0 focus-visible:ring-offset-0"
                                                placeholder="Enter channel name"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field })=> (
                                    <FormItem>
                                        <FormLabel>Channel Type</FormLabel>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger
                                                    className="focus:ring-0 ring-offset-0 focus:ring-offset-0 capitalize outline-none"
                                                >
                                                    <SelectValue placeholder="Select a channel type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.values(ChannelType).map((type) => (
                                                    <SelectItem
                                                        key={type}
                                                        value={type}
                                                        className="capitalize"
                                                    >
                                                        {type.toLowerCase()}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="px-6 py-4">
                            <Button variant="primary" disabled={isLoading}>
                                Save
                            </Button>
                        </DialogFooter>
                    </form>     
                </Form>
            </DialogContent>
        </Dialog>
    )

}