import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import { currentProfile } from "@/lib/current_profile"

interface InviteCodePageProps {
    params : {
        inviteCode : string;
    }
}

async function InviteCodePage({ params } : InviteCodePageProps){
    
    const profile = await currentProfile();

    if(!profile){
        return redirectToSignIn();
    }

    if(!params.inviteCode){
        return redirect("/");
    }

    const existingServer = await db.server.update({
        where : {
            inviteCode : params.inviteCode
        },
        data : {
            members : {
                create : [
                    {
                        profileId : profile.id
                    }
                ]
            }
        }
    })

    if(existingServer){
        return redirect(`/servers/${existingServer.id}`)
    }

    
    return(
        null
    )
}

export default InviteCodePage;