import { Channel, MemberRole, Server } from "@prisma/client"

interface ServerChannelProps{
    channel : Channel;
    role? : MemberRole;
    server : Server;
}

export function ServerChannel({
    channel,
    role,
    server
} : ServerChannelProps){
    return (
        <div>
            Server Channel
        </div>
    )
}