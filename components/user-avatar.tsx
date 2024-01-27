import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils";

interface UserAvatarProps {
    src?: string;
    className? :string;
}

export function UserAvatar({ src, className } : UserAvatarProps){
    
    return (
        <Avatar className={cn("h-6 w-6 md:h-10 md:w-10", className)}>
            <AvatarImage src={src} />
        </Avatar>
    )
}   