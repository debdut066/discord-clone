import { ServerWithMemberWithProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";

interface ServerSectionProps{
    label : string;
    role? : MemberRole;
    sectionType : "channels" | "members";
    channelType? : ChannelType;
    server?: ServerWithMemberWithProfiles;  
}

export function ServerSection({
    label,
    role,
    sectionType,
    channelType,
    server
} : ServerSectionProps){
    return (
        <div>
            Server Section
        </div>
    )
}