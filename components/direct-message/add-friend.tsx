"use client"

import axios from "axios"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
  } from "@/components/ui/form";

const formSchema = z.object({
    name: z.string().min(1, {
      message: "friend name is required."
    }),
});

export default function AddFriend(){

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
        },
    })

    const isLoading = form.formState.isSubmitting;

    async function onSubmit(values: z.infer<typeof formSchema>){
        try {
            const result = await axios.post("/api/friendRequest", values)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="px-6 py-5 flex flex-col h-full gap-y-5 lg:w-[600px] xs:w-fit">
            <div className="flex flex-col gap-y-2">
                <h2 className="uppercase text-base font-semibold">add friend</h2>
                <p className="text-sm font-medium text-[#7c7f86]">You can add friends with Discord username</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex bg-[#1e1f23] w-full p-2 rounded-lg">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl className="w-full">
                                        <Input 
                                            placeholder="You can add friends with their Discord username"
                                            className="bg-transparent w-[360px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={isLoading}
                        >
                            send Friend Request
                        </Button>
                    </div>    
                </form>
            </Form>
        </div>
    )
}