import { Link } from 'react-router-dom'

export const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center">
      <div className="max-w-6xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Content */}
        <div className="text-white space-y-8">
          <div>
            <h1 className="text-6xl font-bold mb-4 leading-tight">
              Dev Dashboard 🚀
            </h1>
            <p className="text-xl text-indigo-100 leading-relaxed">
              Track your coding journey comprehensively. Monitor GitHub commits, solve LeetCode problems, 
              manage your goals, and build unstoppable coding streaks.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <span className="text-3xl">📊</span>
              <div>
                <h3 className="font-bold text-lg">GitHub Analytics</h3>
                <p className="text-indigo-100">Real-time commit history, PR tracking, and language breakdown</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-3xl">🎯</span>
              <div>
                <h3 className="font-bold text-lg">LeetCode Integration</h3>
                <p className="text-indigo-100">Track problem-solving progress with difficulty breakdown</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-3xl">⏱️</span>
              <div>
                <h3 className="font-bold text-lg">Coding Timer</h3>
                <p className="text-indigo-100">Track your coding sessions and build productive streaks</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-3xl">🏆</span>
              <div>
                <h3 className="font-bold text-lg">Score System</h3>
                <p className="text-indigo-100">Unified scoring combining contributions and learning</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-4 pt-4">
            <Link
              to="/settings"
              className="bg-white dark:bg-indigo-200 text-indigo-600 dark:text-indigo-900 px-8 py-3 rounded-lg font-bold hover:bg-indigo-50 dark:hover:bg-indigo-100 transition transform hover:scale-105 shadow-lg"
            >
              Get Started →
            </Link>
            <a
              href="https://github.com/princeraj2572/dev-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-400 dark:bg-indigo-600 bg-opacity-30 dark:bg-opacity-40 text-white border-2 border-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-50 dark:hover:bg-opacity-60 transition"
            >
              GitHub Repo ⭐
            </a>
          </div>
        </div>

        {/* Right Side - Visual */}
        <div className="hidden lg:flex justify-center">
          <div className="relative w-full max-w-md">
            {/* Floating Cards */}
            <div className="absolute top-0 left-0 w-40 h-32 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm p-4 transform -rotate-12 shadow-xl">
              <p className="text-sm font-semibold mb-2">📈 This Week</p>
              <p className="text-3xl font-bold">42</p>
              <p className="text-xs opacity-75">Commits</p>
            </div>

            <div className="absolute top-32 right-0 w-40 h-32 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm p-4 transform rotate-12 shadow-xl">
              <p className="text-sm font-semibold mb-2">🎯 Solved</p>
              <p className="text-3xl font-bold">157</p>
              <p className="text-xs opacity-75">Problems</p>
            </div>

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-32 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm p-4 shadow-xl">
              <p className="text-sm font-semibold mb-2">🔥 Current Streak</p>
              <p className="text-3xl font-bold">28</p>
              <p className="text-xs opacity-75">Days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <Link
          to="/dashboard"
          className="inline-block text-white text-sm opacity-75 hover:opacity-100 transition"
        >
          Skip to Dashboard ↓
        </Link>
      </div>
    </div>
  )
}

export default WelcomePage
