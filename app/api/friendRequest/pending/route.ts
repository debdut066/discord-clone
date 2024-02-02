import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current_profile";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized!!!", { status: 401 })
        }

        const friendRequest = await db.profile.findUnique({
            where: {
                id: profile.id,
            },
            include: {
                friendReciver: {
                    include: {
                        from: {
                            select: {
                                id: true,
                                name: true,
                                imageUrl: true
                            }
                        }
                    }
                },
            },
        })

        return NextResponse.json(friendRequest);

    } catch (error) {
        console.log("[GET]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}