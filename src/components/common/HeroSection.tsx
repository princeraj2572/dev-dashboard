import { Button } from '@/components/ui/button'

interface HeroSectionProps {
  title: string
  subtitle?: string
  description?: string
  ctaText?: string
  secondaryCtaText?: string
  ctaAction?: () => void
  secondaryCtaAction?: () => void
  backgroundVariant?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  icon?: React.ReactNode
}

export const HeroSection = ({
  title,
  subtitle,
  description,
  ctaText,
  secondaryCtaText,
  ctaAction,
  secondaryCtaAction,
  backgroundVariant = 'primary',
  icon,
}: HeroSectionProps) => {
  const variants = {
    primary: {
      gradient: 'from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:to-purple-950',
      accent: 'via-purple-500',
      border: 'border-purple-200/20 dark:border-purple-800/30',
    },
    success: {
      gradient: 'from-emerald-900 via-teal-900 to-slate-900 dark:from-emerald-950 dark:to-slate-950',
      accent: 'via-emerald-500',
      border: 'border-emerald-200/20 dark:border-emerald-800/30',
    },
    warning: {
      gradient: 'from-amber-900 via-orange-900 to-slate-900 dark:from-amber-950 dark:to-slate-950',
      accent: 'via-amber-500',
      border: 'border-amber-200/20 dark:border-amber-800/30',
    },
    danger: {
      gradient: 'from-red-900 via-pink-900 to-slate-900 dark:from-red-950 dark:to-slate-950',
      accent: 'via-pink-500',
      border: 'border-red-200/20 dark:border-red-800/30',
    },
    info: {
      gradient: 'from-blue-900 via-cyan-900 to-slate-900 dark:from-blue-950 dark:to-slate-950',
      accent: 'via-cyan-500',
      border: 'border-blue-200/20 dark:border-blue-800/30',
    },
  }

  const variantConfig = variants[backgroundVariant]

  return (
    <div className={`relative overflow-hidden rounded-2xl border ${variantConfig.border} bg-gradient-to-br ${variantConfig.gradient} p-8 md:p-16 shadow-2xl`}>
      {/* Decorative gradient orbs */}
      <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-3xl" />
      <div className="absolute -left-32 -bottom-32 h-64 w-64 rounded-full bg-gradient-to-tr from-white/5 to-transparent blur-3xl" />
      
      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col gap-8 md:gap-10">
        {/* Header section */}
        <div className="space-y-4">
          {icon && (
            <div className="inline-flex items-center justify-center rounded-lg bg-white/10 p-3 backdrop-blur-sm">
              {icon}
            </div>
          )}
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg font-semibold text-white/90 md:text-xl animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              {subtitle}
            </p>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="max-w-2xl text-base leading-relaxed text-white/80 md:text-lg animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            {description}
          </p>
        )}

        {/* CTA Buttons */}
        {(ctaText || secondaryCtaText) && (
          <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
            {ctaText && ctaAction && (
              <Button
                onClick={ctaAction}
                size="lg"
                className="gap-2 bg-white text-slate-900 hover:bg-white/90 font-semibold"
              >
                {ctaText}
              </Button>
            )}
            {secondaryCtaText && secondaryCtaAction && (
              <Button
                onClick={secondaryCtaAction}
                size="lg"
                variant="outline"
                className="gap-2 border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold"
              >
                {secondaryCtaText}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default HeroSection
