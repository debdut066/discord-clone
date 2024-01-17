import { Fragment } from "react";
import { Button } from "../ui/button";


export function ConversationSearch(){
    return (
        <Fragment>
            <div
                className="w-full text-md font-semibold px-3 flex items-center h-12"
            >
                <Button 
                    variant="ghost"
                    className="pl-2 py-2 text-sm w-full h-8 text-gray-400 flex justify-start bg-[#1e1f23] dark:border-neutral-800 border-b-2"                    
                >
                    Find or start conversation
                </Button>
            </div>
        </Fragment>
    )
}