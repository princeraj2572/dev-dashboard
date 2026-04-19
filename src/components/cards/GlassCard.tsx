interface GlassCardProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export const GlassCard = ({ title, children, className = '' }: GlassCardProps) => {
  return (
    <div className={`backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-xl p-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
      )}
      {children}
    </div>
  )
}

export default GlassCard
