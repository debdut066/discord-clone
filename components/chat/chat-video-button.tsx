"use client";

import qs from "query-string";
import { Video, VideoOff } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { ActionTooltip } from "../action-tooltip";
import { Button } from "../ui/button";

export function ChatVideoButton(){
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const isVideo = searchParams?.get("video");

    function handleClick(){
        const url = qs.stringifyUrl({
            url: pathname || "",
            query: {
              video: isVideo ? undefined : true,
            }
        }, { skipNull: true });
    }

    const Icon = isVideo ? VideoOff : Video;
    const tooltipLabel = isVideo ? "End video call" : "start video call";

    return(
        <ActionTooltip
            side="bottom"
            label={tooltipLabel}
        >
            <Button 
                variant="ghost" 
                onClick={handleClick} 
                className="hover: opacity-75 transition mr-2"
            >
                <Icon className="h-6 w-6 text-zinc dark:text-zinc-400"/>
            </Button>
        </ActionTooltip>
    )

}