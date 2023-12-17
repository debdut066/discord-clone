import { currentProfile } from "@/lib/current_profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { serverId: string } }
) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.serverId) {
            return new NextResponse("Server Id Missing ", { status: 401 });
        }

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id,
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            data: {
                members: {
                    deleteMany: {
                        profileId: profile.id
                    }
                }
            },
        });

        return NextResponse.json(server);

    } catch (error) {
        console.log("[LEAVE_SERVER]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}