# Supabase CLI Chat

A command-line chat application built with Node.js and Supabase, featuring real-time messaging, topics, and private messages.

## Features

- Real-time messaging using Supabase Realtime
- Topic-based chat rooms
- Private messaging support
- Command-line interface
- Colorful output for better readability

## Prerequisites

- Node.js (v14 or higher)
- npm
- Supabase account and project

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd supabase-cli-chat
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Add your Supabase credentials to the `.env` file:
   ```
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Usage

1. Start the application:
   ```bash
   npm start
   ```

2. Enter your username when prompted
3. Enter a topic name (or press Enter for "general")

### Commands

- `/topic <new-topic>` - Switch to a different topic
- `/private <username> <message>` - Send a private message
- `exit` - Quit the application

## Project Structure

```
supabase-cli-chat/
├── src/
│   ├── config/
│   │   └── supabase.js      # Supabase client configuration
│   ├── services/
│   │   └── messageService.js # Message handling logic
│   ├── utils/
│   │   └── logger.js        # Logging utilities
│   └── index.js             # Main application file
├── .env.example             # Environment variables template
├── .gitignore              # Git ignore file
├── package.json            # Project configuration
└── README.md               # Project documentation
```