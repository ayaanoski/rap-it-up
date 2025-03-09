const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const songSchema = new mongoose.Schema({
  songName: String,
  cloudinaryUrl: String
});

const Song = mongoose.model('Song', songSchema);

app.get('/api/songs', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));