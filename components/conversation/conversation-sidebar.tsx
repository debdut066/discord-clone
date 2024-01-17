
import { ConversationSearch } from "./conversation-search";
import { ConversationSection } from "./conversation-section"
import { ConversationSeactionHeader } from "./conversation-section-header";

export default function ConversationSideBar(){
    return (
        <div className="flex flex-col text-primary h-full w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <ConversationSearch/>
            <div className="m-3">
                <ConversationSection channel="%40me"/>
                <ConversationSection channel="Store"/>
            </div>
            <div className="m-3">
                <ConversationSeactionHeader/>
            </div>
        </div>
    )
}