export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-100 dark:border-slate-700" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 dark:border-t-indigo-400 border-r-indigo-600 dark:border-r-indigo-400 animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-purple-600 dark:border-b-purple-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }} />
      </div>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  )
}

export default LoadingSpinner
