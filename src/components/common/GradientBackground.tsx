interface GradientBackgroundProps {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  className?: string
}

export const GradientBackground = ({
  variant = 'primary',
  className = '',
}: GradientBackgroundProps) => {
  const gradients = {
    primary: 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700',
    success: 'bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700',
    warning: 'bg-gradient-to-br from-yellow-500 via-orange-600 to-red-700',
    danger: 'bg-gradient-to-br from-red-500 via-pink-600 to-rose-700',
    info: 'bg-gradient-to-br from-blue-500 via-cyan-600 to-teal-700',
  }

  return <div className={`${gradients[variant]} ${className}`} />
}

export default GradientBackground
