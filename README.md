# Developer Productivity Dashboard 🚀

A comprehensive dashboard for developers to track GitHub contributions, LeetCode progress, coding sessions, and personal goals. Built with React, TypeScript, and Tailwind CSS.

## Features ✨

### 📊 GitHub Integration
- Real-time commit tracking
- Pull request statistics
- Language breakdown analysis
- Repository insights
- Weekly commitment trends

### 🎯 LeetCode Integration
- Problem-solving progress tracking
- Difficulty distribution (Easy/Medium/Hard)
- Acceptance rate monitoring
- Global ranking display
- Problem solved statistics

### ⏱️ Coding Timer
- Track coding sessions
- Calculate coding streaks
- Session history management
- Daily session aggregation
- Productivity metrics

### 🏆 Unified Scoring System
- Combined GitHub + LeetCode score
- Rank badges (Legend, Master, Advanced, etc.)
- Score breakdown by category
- Performance tracking

### 🎪 Goal Management
- Create custom development goals
- Track progress with visual indicators
- Set deadlines for goals
- Completion tracking
- Goal categories (tasks, hours, commits, problems, etc.)

### 🔥 Streak System
- Current streak tracking
- All-time longest streak
- Visual streak badges
- Last activity monitoring
- Motivational messages

### 📈 Analytics Dashboard
- Commit trends visualization
- Language usage pie charts
- Top repositories display
- LeetCode problem distribution
- Acceptance rate metrics

## Tech Stack 🛠️

- **Frontend**: React 18.2 + TypeScript 5.x
- **Build Tool**: Vite 8.0
- **Styling**: Tailwind CSS 3.x
- **State Management**: Zustand + React Query
- **Visualization**: Recharts
- **Routing**: React Router v6
- **Package Manager**: npm

## Prerequisites 📋

- Node.js (v16 or higher)
- npm (v8 or higher)
- Git
- GitHub Personal Access Token
- LeetCode username (optional)

## Installation 🔧

### 1. Clone the Repository

```bash
git clone https://github.com/princeraj2572/dev-dashboard.git
cd dev-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_GITHUB_TOKEN=your_github_personal_access_token_here
```

### Generate GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes:
   - `public_repo`
   - `read:user`
   - `user:email`
4. Generate and copy the token
5. Add it to `.env.local`

### 4. Start the Development Server

```bash
npm run dev
```

The dashboard will be available at `http://localhost:5174` (or next available port)

## Usage 📖

### First Time Setup

1. **Visit the Welcome Page**: Navigate to `/welcome`
2. **Configure Settings**: Go to Settings and enter:
   - GitHub username
   - LeetCode username (optional)
3. **Set Up Coding Timer**: Start tracking sessions on the DSA Tracker page
4. **Create Goals**: Set development goals on the Goals page

### Navigation

- **Dashboard**: Overview with score, streaks, stats, and quick goals
- **Analytics**: Deep dive into GitHub and LeetCode statistics
- **DSA Tracker**: Coding timer and session management
- **Goals**: Create, track, and manage development goals
- **Settings**: Configure usernames, tokens, and preferences

## Features Breakdown 

### Dashboard
- **Score Display**: Your combined developer score with rank badge
- **Streak Indicator**: Current and all-time longest coding streaks
- **Goals Overview**: Quick view of top 3 active goals
- **Stats Grid**: Commits, PRs, and problems solved this week
- **Charts**: Commit trends and language breakdown
- **LeetCode Stats**: Problem difficulty distribution

### Analytics
- **Commit Trends**: Line chart showing commits over time
- **Language Distribution**: Pie chart of programming languages used
- **Top Repositories**: List of your most-starred repositories
- **LeetCode Metrics**: Problem breakdown by difficulty level
- **Acceptance Rate**: LeetCode solution success rate

### DSA Tracker
- **Large Timer Display**: HH:MM:SS format with motivational messages
- **Start/Stop Controls**: Begin and end coding sessions
- **Session History**: Detailed list of all coding sessions
- **Quick Stats**: Total hours, average session, daily total
- **Session Management**: View, clear, or manage sessions

### Goals
- **Create Goals**: Form with title, target, unit, and deadline
- **Progress Tracking**: Visual progress bars for each goal
- **Difficulty Categories**: Easy/Medium/Hard tasks
- **Completion Status**: Celebrate when targets are met
- **Statistics**: Total, active, and completed goal counts

### Settings
- **GitHub Configuration**: Username and token management
- **LeetCode Setup**: Optional username configuration
- **Theme Toggle**: Light/Dark mode preference
- **Session Management**: Clear coding session history
- **Help Guide**: Setup instructions for all integrations

## Project Structure 📁

```
src/
├── pages/              # Page components (Dashboard, Analytics, etc.)
├── components/         # Reusable UI components
│   ├── layout/        # Layout wrapper, Sidebar, MainContent
│   ├── cards/         # StatsCard component
│   ├── charts/        # Chart components (CommitChart)
│   ├── common/        # Common components (ErrorBoundary, LoadingSpinner)
│   ├── leetcode/      # LeetCode components
│   ├── score/         # Score display components
│   ├── streak/        # Streak display components
│   ├── goals/         # Goal management components
│   └── timer/         # Timer components
├── hooks/             # Custom React hooks
│   ├── useGithubData.ts
│   ├── useLeetCodeData.ts
│   ├── useCodingTimer.ts
│   └── useGoals.ts
├── services/          # API services
│   ├── githubAPI.ts
│   └── leetcodeAPI.ts
├── store/             # Zustand state management
│   └── dashboardStore.ts
├── types/             # TypeScript interfaces
│   └── index.ts
├── utils/             # Utility functions
│   ├── scoreCalculator.ts
│   ├── streakCalculator.ts
│   └── codingStatsCalculator.ts
├── App.tsx            # Main app component with routing
└── main.tsx           # Entry point
```

## Available Scripts 📝

```bash
# Development
npm run dev           # Start dev server

# Build
npm run build        # Build for production

# Preview
npm run preview      # Preview production build

# Type Check
npm run type-check   # Run TypeScript type checking

# Lint
npm run lint         # Run ESLint (if configured)
```

## Data Persistence 💾

The dashboard uses localStorage for persistent data:
- **GitHub & LeetCode usernames**: `github_username`, `leetcode_username`
- **Coding sessions**: `codingTimerState`
- **Goals**: `goals`
- **Theme preference**: `theme`

**Note**: GitHub token is stored in `.env.local` (never committed to git)

## API Rate Limits ⚠️

### GitHub API
- 60 requests/hour (unauthenticated)
- 5,000 requests/hour (authenticated with token)

### LeetCode API
- Uses third-party proxy (Rate limits: ~2,000 requests/day)

## Performance Optimizations ⚡

- **React Query Caching**: 5-minute cache TTL for API data
- **Lazy Loading**: Components load on demand
- **Code Splitting**: Automatic with Vite
- **Local Storage**: Persistent state without extra requests

## Security Considerations 🔒

- ✅ GitHub token stored in `.env.local` (never committed)
- ✅ `.env.local` added to `.gitignore`
- ✅ No sensitive data exposed in frontend code
- ✅ API calls use Bearer token authentication
- ✅ LeetCode data fetched via CORS-enabled proxy

## Troubleshooting 🐛

### GitHub data not loading
- Verify GitHub username in Settings
- Check GitHub token in `.env.local`
- Ensure token has required scopes
- Check GitHub API rate limit status

### LeetCode data not showing
- Verify LeetCode username spelling (case-sensitive)
- Check internet connection
- Verify third-party API is accessible

### Dev server not starting
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Port already in use
The dev server automatically tries the next available port (5173 → 5174 → 5175)

## Contributing 🤝

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Future Enhancements 🔮

- [ ] Dark mode improvements
- [ ] Mobile app version
- [ ] Data export (CSV, PDF)
- [ ] Habit tracking
- [ ] Social sharing features
- [ ] Development roadmap planner
- [ ] Interview prep mode
- [ ] Contribution calendar visualization

## License 📄

MIT License - feel free to use this project for personal or commercial purposes

## Support 💬

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review troubleshooting section above

---

**Start tracking your coding journey today!** 🚀

Built with ❤️ for developers, by developers.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
