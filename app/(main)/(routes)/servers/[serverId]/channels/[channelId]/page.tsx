import { ChatHeader } from "@/components/chat/chat-header";
import { currentProfile } from "@/lib/current_profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
    params : {
        serverId : string;
        channelId : string;
    }
}

async function ChannelIdPage({ params } : ChannelIdPageProps){

    const profile = await currentProfile();

    if(!profile){
        return redirectToSignIn();
    }

    const channel = await db.channel.findUnique({
        where : {
            id : params.channelId
        },
    });

    if(!channel){
        return redirect("/")
    }

    return(
        <div className="">
            <ChatHeader
                name={channel.name}
                serverId={channel.serverId}
                type="channel"
            />
        </div>
    )
}

export default ChannelIdPage;