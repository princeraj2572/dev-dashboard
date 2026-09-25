export const LoadingSpinner = () => {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-3 p-12 text-subtle">
      <span className="size-8 animate-spin rounded-full border-[3px] border-line border-t-brand" />
      <p className="text-sm">Loading your stats</p>
    </div>
  )
}

export default LoadingSpinner
