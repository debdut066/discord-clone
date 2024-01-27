"use client"

import axios from "axios";
import { useEffect, useState } from "react";

import DMHeader from "@/components/direct-message/DM-header"
import AddFriend from "@/components/direct-message/add-friend"
import DMContent from "@/components/direct-message/DM-content";

export default function MyChannel(){
    const [friendRequestState, setfriendRequestState] = useState<string>("All")
    const [friendData, setfriendData] = useState<[] | any>([]);

    useEffect(()=>{
        if(friendRequestState === "Pending"){
            (async ()=>{
                const { data : response } = await axios.get('/api/friendRequest/pending');
                console.log("response", response)
                // setfriendData(response.friendReciver);
            })()
        }
    },[friendRequestState])

    return (
        <div className="flex flex-col bg-white dark:bg-[#313338] h-full">
            <DMHeader type={friendRequestState} setType={setfriendRequestState}/>
            {/* { friendRequestState === "Add Friend" && <AddFriend/>}
            <DMContent data={friendData} type={friendRequestState}/> */}
        </div>
    )
}