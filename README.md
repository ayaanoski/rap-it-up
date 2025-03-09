# Rap-It-Up

Rap-It-Up is an innovative platform that transforms the way people learn and engage with rap music through a gamified, blockchain-powered experience. This project combines educational content with competitive elements to create a unique learn-and-earn ecosystem where users can develop their rap skills while competing for exclusive NFT rewards.

## 🚀 Features

### Learn and Earn
- **Comprehensive Tutorials:** Users can access tutorials covering rhythm, flow, wordplay, and freestyle techniques.
- **Instant Feedback:** Advanced voice recognition technology analyzes user performance in terms of timing, pronunciation, and delivery.
- **Exclusive NFTs:** Top performers receive NFT artwork created by renowned digital artists, representing different achievement milestones and rap styles.

### Competitive Social Layer
- **Rap Battles:** Users can challenge friends to rap battles.
- **Weekly Tournaments:** Participate in weekly competitions to earn leaderboard positions.
- **Leaderboard Reset:** The leaderboard resets every Sunday, giving everyone a fresh chance to compete.

### Blockchain Integration
- **NFT Rewards:** Winners can claim unique NFT rewards that act as digital collectibles with potential marketplace value.
- **Digital Assets:** The NFTs double as badges of honor for top performers.

## 📂 Project Structure

The project is structured as follows:

```
ayaanskoski-rap-it-up/
│
├── app/                  # Main application directory
│   ├── api/              # API routes
│   │   ├── lyrics/       # API endpoint for lyrics
│   │   ├── songs/        # API endpoint for songs
│   │   └── [id]/         # Dynamic routes for songs
│   ├── connect/          # Page to connect wallet
│   ├── leaderboard/      # Leaderboard page
│   ├── play/             # Page to play rap battles
│   ├── redirect/         # Redirect page
│   ├── results/          # Results and feedback page
│   ├── songs/            # List of available songs
│   ├── layout.tsx        # Layout for the application
│   ├── page.tsx          # Landing page
│
├── backend/              # Backend API and database
│   ├── server.js         # Node.js server
│   ├── dbConfig/         # Database configuration
│   │   ├── dbConfig.ts   # Database connection file
│   ├── model/            # Database models
│   │   ├── songModel.ts  # Song schema
│
├── components/           # Reusable UI components
│   ├── ui/               # Custom UI components (e.g., Button, Card)
│   ├── LoginButton.tsx   # Login button component
│   ├── OCConnectWrapper.tsx # Wrapper for OpenConnect
│   ├── pixelated-background.tsx # Pixelated background component
│   ├── pixelated-title.tsx # Pixelated title component
│   ├── theme-provider.tsx # Theme provider for dark/light mode
│
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Public assets (Pixelart)
├── styles/               # Global styles
├── package.json          # Project dependencies
├── next.config.mjs       # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── postcss.config.mjs    # PostCSS configuration
```

## 💾 Installation

Clone the repository and install the dependencies.

```bash
$ git clone https://github.com/ayaanoski/rap-it-up.git
$ cd rap-it-up
$ npm install
```

## 💻 Running the Project

Run the frontend and backend simultaneously:

```bash
# Start the backend server
$ cd backend
$ npm start

# Start the Next.js frontend
$ cd ../
$ npm run dev
```

## 📜 Environment Variables

Create a `.env` file in the root directory and provide the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
MONGODB_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret>
```

## 📊 Database

The project uses **MongoDB** for data storage. The database contains collections for:
- **Users:** Stores user information, profiles, and achievements.
- **Songs:** Stores song data, lyrics, and metadata.
- **NFTs:** Stores NFT data and ownership.

## 🤝 Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Open a pull request.

## 🪪 License

This project is licensed under the [MIT License](LICENSE).

## 📬 Contact

For any questions or feedback, feel free to reach out:
- **GitHub:** [ayaanoski](https://github.com/ayaanoski)
- **LinkedIn:** [Ayaan Adil](https://www.linkedin.com/in/ayaan-adil-371137268/)
- **Email:** your-email@example.com

---
_Join the revolution of learn-and-earn in rap music with Rap-It-Up!_ 🎤🚀

