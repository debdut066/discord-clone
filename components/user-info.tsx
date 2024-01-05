
import { Profile, Member } from "@prisma/client";
import Image from "next/image";
import { Shield, ShieldCheck } from "lucide-react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";

interface userInfoProps {
    member : Member & { profile: Profile };
}

const roleIconMap = {
    "GUEST" : null,
    "MODERATOR" : <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500"/>,
    "ADMIN" : <Shield className="h-4 w-4 text-sky-500 fill-sky-500"/>
}

export function UserInfo({ member }:userInfoProps){

    let date = new Date(member.createdAt);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()]; // Get month name from array
    const day = String(date.getDate()).padStart(2, '0'); // Pad day with leading zero if needed
    const year = date.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`

    return (
        <Popover>
            <PopoverTrigger>
                <p className="font-semibold text-sm hover:underline cursor-pointer mr-1">{member.profile.name}</p>
            </PopoverTrigger>
            <PopoverContent className="bg-[#323338] p-0 h-auto">
                <div className="flex flex-col w-full">
                    <div className="flex flex-col relative">
                        <span className="bg-white h-14 rounded">
                        </span>
                        <Image
                            src={member.profile.imageUrl}
                            alt="member-image"
                            height={65}
                            width={65}
                            className="absolute top-5 bg-[#323338] left-5 rounded-full p-1.5"
                        />
                        <span className="h-5">
                        </span> 
                    </div>
                    <Card className="m-4">
                        <CardHeader className="p-4">
                            <CardTitle className="text-lg">
                                {member.profile.name}
                            </CardTitle>
                            <CardDescription className="text-xs">Overlord066</CardDescription>
                        </CardHeader>
                        <Separator
                            className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-full"
                        />
                        <CardContent className="grid gap-4 mt-2 p-4">
                            <div className="flex flex-col">
                                <p className="text-xs uppercase font-bold">About Me</p>
                                <p className="bg-[#2c2d31] p-1 mt-1 rounded text-sm">Its not over until I win</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs uppercase font-bold">Member since</p>
                                <span className="text-xs pt-2">
                                    {formattedDate}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs uppercase font-bold">role</p>
                                <p className="bg-[#2c2d31] p-1 mt-1 rounded text-xs gap-1 flex">{roleIconMap[member.role]}{member.role}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </PopoverContent>
        </Popover>
    )
}