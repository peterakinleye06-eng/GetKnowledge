# GetKnowledge 🎓

A WAEC & JAMB study app for Nigerian secondary school students.

## Features
- 📊 Dashboard with XP, streak & exam countdown
- 📝 CBT Practice (WAEC & JAMB)
- 📚 Library of study notes
- ⚡ Daily Challenges
- 🤖 AI Tutor — Mr. Knowledge (powered by Claude)

## Setup

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push to GitHub
2. Import repo on vercel.com
3. Add environment variable: `ANTHROPIC_API_KEY=sk-ant-...`
4. Deploy!

## Project Structure

```
getknowledge/
├── api/
│   └── tutor.js          # Vercel serverless — proxies Anthropic API
├── src/
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── components/
│   │   └── Icon.jsx
│   ├── pages/
│   │   ├── AuthPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── CBTPage.jsx
│   │   ├── LibraryPage.jsx
│   │   ├── ChallengePage.jsx
│   │   └── TutorPage.jsx
│   ├── data.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```
