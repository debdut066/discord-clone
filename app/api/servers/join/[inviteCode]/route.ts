import { currentProfile } from "@/lib/current_profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { inviteCode: string } }
) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.inviteCode) {
            return new NextResponse("inviteCode Missing ", { status: 401 });
        }

        const server = await db.server.update({
            where: {
                inviteCode: params.inviteCode
            },
            data: {
                members: {
                    create: [
                        {
                            profileId: profile.id
                        }
                    ]
                }
            }
        })

        return NextResponse.json(server);

    } catch (error) {
        console.log("[JOIN_SERVER]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}