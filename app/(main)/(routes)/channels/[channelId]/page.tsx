
import DMHeader from "@/components/direct-message/DM-header"
import AddFriend from "@/components/direct-message/add-friend"

export default async function MyChannel(){

    return (
        <div className="flex flex-col bg-white dark:bg-[#313338] h-full">
            <DMHeader/>
            <AddFriend/>
        </div>
    )
}