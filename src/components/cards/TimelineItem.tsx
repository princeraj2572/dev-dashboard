interface TimelineItemProps {
  title: string
  description?: string
  time: string
  icon?: string
  status: 'completed' | 'in-progress' | 'pending'
}

export const TimelineItem = ({
  title,
  description,
  time,
  icon,
  status,
}: TimelineItemProps) => {
  const statusColors = {
    completed: 'bg-green-500 dark:bg-green-600',
    'in-progress': 'bg-blue-500 dark:bg-blue-600',
    pending: 'bg-gray-400 dark:bg-gray-600',
  }

  return (
    <div className="flex gap-4">
      {/* Timeline dot */}
      <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full ${statusColors[status]} flex items-center justify-center text-white text-xs`}>
          {icon && <span>{icon}</span>}
        </div>
        <div className="w-1 h-16 bg-gray-300 dark:bg-gray-700 mt-2" />
      </div>

      {/* Content */}
      <div className="pb-8">
        <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{time}</p>
      </div>
    </div>
  )
}

export default TimelineItem
