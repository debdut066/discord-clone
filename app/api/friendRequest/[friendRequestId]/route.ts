import { currentProfile } from "@/lib/current_profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    { params }: { params: { friendRequestId: string } }
) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized!!!", { status: 401 })
        }

        if (!params.friendRequestId) {
            return new NextResponse("friendRequst ID missing", { status: 400 });
        }

        const friendRequest = await db.friendRequest.update({
            where: {
                id: params.friendRequestId
            },
            data: {
                accepted: true
            }
        })

        return NextResponse.json(friendRequest)

    } catch (error) {
        console.log("[FRIEND_REQUEST_ACCEPT_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}