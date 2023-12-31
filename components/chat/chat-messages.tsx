"use client"

import { Fragment, useRef, ElementRef } from "react";
import { format } from "date-fns"
import { Member, Message, Profile } from "@prisma/client";
import { Loader2, ServerCrash } from "lucide-react";

import { useChatQuery } from "@/hooks/use-chat-query";
import { useChatSocket } from "@/hooks/use-chat-socket"

import { ChatWelcome } from "./chat-welcome";
import ChatItem from "./chat-item";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import { Button } from "../ui/button";

const DATE_FORMAT = "dd/MM/yyyy, HH:mm"

type MessageWithMemberWithProfile = Message & {
    member : Member & {
        profile : Profile
    }
}

interface ChatMessagesProps {
    member : Member;
    name : string;
    chatId : string;
    type : "channel" | "conversation"
    apiUrl : string;
    socketUrl : string;
    socketQuery : Record<string, string>;
    paramKey : "channelId" | "conversationId";
    paramValue : string;
}

function ChatMessages({
    member,
    name,
    chatId,
    type,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue
} : ChatMessagesProps){
    const queryKey = `chat:${chatId}`;
    const addKey = `chat:${chatId}:message`;
    const updateKey = `chat:${chatId}:messages:update`;

    const chatRef = useRef<ElementRef<"div">>(null);
    const bottomRef = useRef<ElementRef<"div">>(null)

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue,
    });
    useChatSocket({ queryKey, addKey, updateKey });
    useChatScroll({
        chatRef,
        bottomRef,
        loadMore: fetchNextPage,
        shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
        count: data?.pages?.[0]?.items?.length ?? 0,
    })
    
    if(status === 'pending'){
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4"/>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Loading messages...
                </p>
            </div>
        )
    }

    if (status === "error") {
        return (
          <div className="flex flex-col flex-1 justify-center items-center">
            <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Something went wrong!
            </p>
          </div>
        )
    }

    return (
        <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
            {!hasNextPage && <div className="flex-1"/>}
            {!hasNextPage && (
                <ChatWelcome
                    name={name}
                    type={type}
                />
            )}
            {hasNextPage && (
                <div className="flex justify-center">
                    {isFetchingNextPage ? (
                        <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4"/>
                    ):(
                        <Button
                            variant="ghost"
                            onClick={() => fetchNextPage()}
                            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition"
                        >
                            Load previous messages
                        </Button>
                    )}
                </div>
            )}
            <div className="flex flex-col-reverse mt-auto">
                {data?.pages?.map((group, i) => (
                    <Fragment key={i}>
                        { group?.items?.map((message:MessageWithMemberWithProfile) => (
                            <ChatItem 
                                key={message.id}
                                id={message.id}
                                currentMember={member}
                                member={message.member}
                                content={message.content}
                                fileUrl={message.fileUrl}
                                deleted={message.deleted}
                                isUpdated={message.createdAt !== message.updatedAt}
                                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                                socketUrl={socketUrl}
                                socketQuery={socketQuery}
                            />
                        ))}
                    </Fragment>
                ))}
            </div>
            <div ref={bottomRef} />
        </div>
    )
}

export default ChatMessages;