interface HeroSectionProps {
  title: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaAction?: () => void
  backgroundVariant?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
}

export const HeroSection = ({
  title,
  subtitle,
  description,
  ctaText,
  ctaAction,
  backgroundVariant = 'primary',
}: HeroSectionProps) => {
  const variants = {
    primary: 'from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900',
    success: 'from-green-600 to-emerald-600 dark:from-green-900 dark:to-emerald-900',
    warning: 'from-yellow-600 to-orange-600 dark:from-yellow-900 dark:to-orange-900',
    danger: 'from-red-600 to-rose-600 dark:from-red-900 dark:to-rose-900',
    info: 'from-blue-600 to-cyan-600 dark:from-blue-900 dark:to-cyan-900',
  }

  return (
    <div className={`bg-gradient-to-r ${variants[backgroundVariant]} rounded-xl p-8 md:p-12 text-white overflow-hidden relative`}>
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">{title}</h1>
        {subtitle && <p className="text-lg md:text-xl text-white/90 mb-4 font-semibold">{subtitle}</p>}
        {description && <p className="text-white/80 mb-6 max-w-2xl text-sm md:text-base">{description}</p>}

        {ctaText && ctaAction && (
          <button
            onClick={ctaAction}
            className="mt-4 inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {ctaText}
          </button>
        )}
      </div>
    </div>
  )
}

export default HeroSection
