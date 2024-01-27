import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs"

export async function GET(
    req: Request,
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const profileData = await db.profile.findUnique({
            where: {
                userId: userId
            }
        })

        return NextResponse.json(profileData);
    } catch (error) {
        console.log("[PROFILE_DATA]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
