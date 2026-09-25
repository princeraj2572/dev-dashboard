import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { lastNDays } from '@/utils/weekActivity'

interface CommitData {
  day: string
  count: number
}

interface CommitChartProps {
  data: CommitData[]
}

const axisTick = { fill: 'var(--subtle)', fontSize: 12 }

export const CommitChart = ({ data }: CommitChartProps) => {
  const days = lastNDays(data || [], 7)

  if (days.every((d) => d.count === 0)) {
    return (
      <div className="grid h-64 place-items-center text-center text-sm text-subtle">
        <p>No commits in the last 7 days.</p>
      </div>
    )
  }

  const chartData = days.map((d) => ({ weekday: d.weekday, count: d.count }))

  return (
    <div className="h-64" role="img" aria-label="Bar chart of commits per day for the last 7 days">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} barCategoryGap="28%" margin={{ top: 8, right: 4, bottom: 0, left: -12 }}>
          <CartesianGrid vertical={false} stroke="var(--line)" />
          <XAxis dataKey="weekday" tickLine={false} axisLine={false} tick={axisTick} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={axisTick} width={40} />
          <Tooltip
            cursor={{ fill: 'var(--sunken)' }}
            contentStyle={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 8,
              color: 'var(--ink)',
              fontSize: 13,
            }}
          />
          <Bar dataKey="count" name="Commits" fill="var(--brand)" radius={[4, 4, 0, 0]} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CommitChart
