import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current_profile";
import { db } from "@/lib/db";

export async function POST(req: NextResponse) {
    try {
        const { name } = await req.json();
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized!!!", { status: 401 })
        }

        const friendProfile = await db.profile.findFirst({
            where: { name }
        })

        if (!friendProfile) {
            return new NextResponse("Friend doesn't exists", { status: 404 })
        }

        const friendRequest = await db.friendRequest.create({
            data: {
                fromId: profile.id,
                toId: friendProfile.id
            }
        })

        return NextResponse.json(friendRequest);

    } catch (error) {
        console.log("[FRIEND_REQUEST_POST]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}
