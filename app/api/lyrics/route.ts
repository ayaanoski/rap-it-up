// File: app/api/lyrics/route.js
import { NextResponse } from "next/server";

// This is a placeholder. In a real app, you'd fetch lyrics from a database or external API
const lyricsDatabase = {
  "Khatta Flow": [
    "Chakk kabootar, chakk teetar",
    "Khatta flow, meetha pyaar",
    "Seedhe maut se jhelo haath",
    "Basti ki galliyon mein karenge raaj",
    "Mic pe aake, flow ko kadak",
    "Seedhe nikaala, insaan ko naqaab",
    "Zindagi ko jeete, jaise aaj hai aakhri din",
    "Delhi se nikle, ab poore desh mein",
  ],
  "Heavy Pen": [
    "Vinsmoke on the track, heavy pen flow",
    "Likhte shabdon ko, jaise koi aag ho",
    "Mic pe kabza, scene pe control",
    "Indian hip-hop mein, main next level",
    "Jab main bolta hoon, sunti hai duniya",
    "Flow hai samundar, bars hain gehre",
    "Yeh kahaani meri, yeh iraade mere",
    "Haq se liya maine, jo tha mera",
  ],
  // Add more songs as needed
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const songName = searchParams.get("song");
  
  if (!songName) {
    return NextResponse.json(
      { error: "Song name is required" },
      { status: 400 }
    );
  }
  
  // Try to find exact match first
  if (lyricsDatabase[songName]) {
    return NextResponse.json({ lyrics: lyricsDatabase[songName] });
  }
  
  // Try partial match
  const songKeys = Object.keys(lyricsDatabase);
  const matchedSong = songKeys.find(key => 
    key.toLowerCase().includes(songName.toLowerCase()) || 
    songName.toLowerCase().includes(key.toLowerCase())
  );
  
  if (matchedSong) {
    return NextResponse.json({ lyrics: lyricsDatabase[matchedSong] });
  }
  
  // No lyrics found, return placeholder
  return NextResponse.json({ 
    lyrics: [
      `Hola amigo (Yeah, yeah), kaise ho, theek ho?`,
      `Kya chal raha hai bruv?`,
      `Milte hai jald`,
      `Tell me what's up? (Haan)`,
      `Hola amigo (It's that dollar sign!)`,
      `Kaise ho, theek ho? (Seedhe Maut)`,
      `Ghar pe kaise hai sab?`,
      `Aunty ko bolna "I'm sending my lov`,
    ] 
  });
}