import { dbConnect } from "@/backend/dbConfig/dbConfig"
import Song from "@/backend/model/songModel"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect()
  try {
    // Fetch the song by ID from the database
    const song = await Song.findById(params.id)

    if (!song) {
      return NextResponse.json({ success: false, message: "Song not found" }, { status: 404 })
    }

    // Return the song as a response
    return NextResponse.json({
      success: true,
      data: song,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}

