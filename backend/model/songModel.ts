import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  songName: String,
  cloudinaryUrl: String,
  difficulty: String,
  artist: String,
  duration: String,
  image: String,
});

const Song = mongoose.models.Rap || mongoose.model("Rap", songSchema);

export default Song;
