import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current_profile";

export async function PATCH(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const profile = await currentProfile();
        const { name, value } = await req.json();
        console.log(name, value)

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.userId) {
            return new NextResponse("user ID missing", { status: 400 });
        }

        const profileData = await db.profile.update({
            where: {
                id: params.userId,
            },
            data: {
                [name]: value
                // mute: true
            }
        });

        return NextResponse.json(profileData);
    } catch (error) {
        console.log("[PROFILE_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
