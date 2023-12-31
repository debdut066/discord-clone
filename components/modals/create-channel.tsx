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

import { useModal } from "@/hooks/use-modal-store";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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

export function CreateChannel(){
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();
    const params = useParams()

    const isModelOpen = isOpen && type === "createChannel";
    const { channelType } = data;

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          type: channelType || ChannelType.TEXT,
        }
    });

    useEffect(()=> {
        if(channelType){
            form.setValue("type", channelType)
        }else{
            form.setValue("type", ChannelType.TEXT)
        }
    }, [channelType, form])

    const isLoading = form.formState.isSubmitting;

    function handleClose(){
        form.reset();
        onClose();
    }

    async function onSubmit(values : z.infer<typeof formSchema>){
        try {
            const url = qs.stringifyUrl({
              url: "/api/channels",
              query: {
                serverId: params?.serverId
              }
            });
            await axios.post(url, values);
      
            form.reset();
            router.refresh();
            onClose();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog open={isModelOpen} onOpenChange={handleClose}>
            <DialogContent className="dark:bg-[#323338]">
                <DialogHeader>
                    <DialogTitle>
                        Create channel
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4 px-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field })=>((
                                    <FormItem>
                                        <FormLabel>
                                            Channel Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="dark:bg-[#43434b] focus-visible:ring-0 focus-visible:ring-offset-0"
                                                placeholder="Enter channel name"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                ))}
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
                                                    className="dark:bg-[#43434b] focus:ring-0 ring-offset-0 focus:ring-offset-0 capitalize outline-none"
                                                >
                                                    <SelectValue placeholder="Select a channel type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="dark:bg-[#43434b]">
                                                {Object.values(ChannelType).map((type) => (
                                                    <SelectItem
                                                        key={type}
                                                        value={type}
                                                        className="capitalize dark:bg-[#43434b]"
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
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}