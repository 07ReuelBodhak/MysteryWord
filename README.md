# MysteryWord

An AI-powered word guessing game where players use deduction to find the hidden word before time runs out.

## Description

MysteryWord is a multiplayer-ready web application where users log in with Discord, start a guessing game session, and attempt to guess a hidden word by asking Yes/No/Maybe questions to an AI assistant. The app features a competitive leaderboard, spectator mode, and a sleek, modern black-and-white aesthetic.

## Features

- **Modern UI/UX**: Clean, black and white aesthetic built with Tailwind CSS.
- **Discord Authentication**: Seamless login and user profile creation using Discord OAuth.
- **Protected Routes**: Secure access to game features using Next.js Middleware.
- **AI-Powered Gameplay**: (Planned) Interact with an AI assistant that answers Yes/No/Maybe questions.
- **Leaderboards**: Track user scores, wins, losses, and best streaks.
- **Profile Management**: View personal stats and recent games.
- **Spectator Mode**: (Planned) Watch active sessions and send distraction chat bubbles.

## Tech Stack

### Frontend

- **Framework**: Next.js (App Router)
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **Authentication**: Auth.js (NextAuth) with Discord Provider
- **Icons**: Lucide React
- **Animations**: Motion / Framer Motion

### Backend (Current)

- **Database**: MongoDB with Mongoose
- **API**: Next.js Server Actions / API Routes

### Backend & AI Stack (Planned)

- **Backend API**: FastAPI
- **Real-Time**: WebSockets
- **AI Engine**: LangChain + Groq
- **Database**: MongoDB (Sessions, Users, Leaderboard, Guesses, Chat)

## Folder Structure

```text
app/
  home/             # Protected home dashboard
  game/             # Game session UI (Player / Spectator)
  leaderboard/      # Global rankings
  profile/          # User stats and history
  login/            # Authentication page
  unauthorized/     # Access denied page
  api/auth/         # NextAuth route handlers
components/
  auth/             # Login buttons
  game/             # Game UI (Timer, chat, stickers)
  home/             # Dashboard cards
  layout/           # Navigation, shells
  leaderboard/      # Leaderboard table
  profile/          # User stat displays
  shared/           # Reusable UI (Buttons, Cards, Avatars)
lib/
  db/               # MongoDB connection and Mongoose models
  utils.js          # Shared utility functions
middleware.js       # Route protection logic
```

## Authentication Flow

1. User clicks "Login with Discord" on the landing or login page.
2. NextAuth handles the OAuth flow with the Discord Developer Portal.
3. Upon successful login, the `signIn` callback checks if the user exists in the MongoDB database via their `discord_id`.
4. If the user is new, a MongoDB document is created for them, along with a default leaderboard entry.
5. The JWT and Session callbacks are populated with the MongoDB `ObjectId` and Discord user data for use across the app.
6. Client components access session data via `useSession` from `next-auth/react`, while Server actions/API routes utilize server-side auth utilities.

## Environment Variables

To run the application, create a `.env.local` file in the root directory and add the following variables:

```env
# NextAuth Configuration
NEXTAUTH_SECRET="your_nextauth_secret" # Generate with: openssl rand -base64 32
AUTH_SECRET="your_auth_secret"         # Match NEXTAUTH_SECRET

# Application URLs
NEXTAUTH_URL="http://localhost:3000"
AUTH_URL="http://localhost:3000"

# Discord OAuth configuration
AUTH_DISCORD_ID="your_discord_client_id"
AUTH_DISCORD_SECRET="your_discord_client_secret"

# MongoDB Database Connection
MONGODB_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/guessarena"
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/07ReuelBodhak/MysteryWord.git
   cd MysteryWord
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure your `.env.local` file as shown above.

## How to Run Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## MongoDB Setup Notes

1. Create a MongoDB Atlas cluster (or use a local MongoDB instance).
2. Retrieve your connection string.
3. Replace `<username>` and `<password>` in the `MONGODB_URI` environment variable with your database credentials.
4. The application handles database connection and initialization of Mongoose models (User, Session, Leaderboard) automatically.

## Discord Developer Portal Setup Notes

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Create a "New Application".
3. Navigate to the "OAuth2" section.
4. Copy the "Client ID" and paste it into `AUTH_DISCORD_ID`.
5. Copy the "Client Secret" and paste it into `AUTH_DISCORD_SECRET`.
6. Add the following redirect URI: `http://localhost:3000/api/auth/callback/discord` (Update this for production).

## Protected Routes Explanation

The application uses Next.js Middleware to ensure only authenticated users can access the following routes:

- `/home`
- `/game`
- `/profile`
- `/leaderboard`

If an unauthenticated user attempts to access these routes, they are redirected to the `/unauthorized` or `/login` page. Client-side authentication leverages `next-auth/react` (`SessionProvider`, `useSession`), and server-side operations use Auth.js server utilities to prevent unauthorized data access.

## Current Project Status

The project frontend foundation is complete.

- Implemented modern black-and-white UI components.
- Established Next.js App Router structure.
- Integrated Discord OAuth and MongoDB user persistence.
- Added middleware route protection.
- Created dummy logic for game elements (Timer, Question Flow, Guessing) awaiting backend integration.

## Planned Features

- **Real-Time Multiplayer API**: Full integration with a FastAPI backend.
- **AI Assistant Integration**: Connecting LangChain and Groq to process questions and evaluate answers (Yes/No/Maybe).
- **Live Leaderboards**: WebSocket updates for global rankings.
- **Spectator Experiences**: Live view of active games and interactive "distraction" chat bubbles.

## Backend Integration Plan

The Next.js frontend will communicate with a FastAPI backend.

- The Next.js API routes will act as a secure proxy for standard REST calls.
- Game mechanics (starting a session, validating guesses) will be handled _exclusively_ by the FastAPI server to prevent cheating.
- MongoDB will be directly accessed by the FastAPI backend to store complex game state.

## WebSocket Integration Plan

WebSockets will be utilized strictly for live updates during active gameplay.

- **Player View**: Receive real-time AI responses and opponent progress.
- **Spectator View**: Stream the question history and chat messages.
- WebSockets will not act as permanent storage; all persistent state will remain in MongoDB.

## Security Notes

- **Hidden Words**: The target hidden word must **never** be sent to the client frontend during an active game.
- **Validation**: All final guesses and question evaluations must be run securely on the server/FastAPI backend.
- **Identity**: `discord_id` is the stable identifier for users; avoid relying solely on mutable fields like username.

## Common Issues and Fixes

- **Client/Server Auth Imports**:
  - _Issue_: Importing `auth` from a server file into a client component.
  - _Fix_: Use `useSession` from `next-auth/react` for client components, and keep `auth()` imports restricted to Server Components, Actions, and API Route Handlers.
- **MongoDB Connection Limits**: Ensure the database connection is cached in development to prevent exhausting connection limits during Next.js Hot Module Replacement.

## Git Workflow / Contribution

1. Fork the feature branch (`git checkout -b feature/amazing-feature`).
2. Commit your changes (`git commit -m 'feat: add amazing feature'`).
3. Push to the branch (`git push origin feature/amazing-feature`).
4. Open a Pull Request.

Ensure all commits follow standard conventional commit guidelines.

## License

MIT License
