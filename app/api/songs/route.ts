import { dbConnect } from "@/backend/dbConfig/dbConfig";
import Song from "@/backend/model/songModel";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {
    await dbConnect();
    try {
        // Fetch all songs from the database
        const songs = await Song.find();

        // Return the songs as a response
        return Response.json({
            success: true,
            data: songs
        });

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}
