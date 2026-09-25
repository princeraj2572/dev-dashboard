import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts'
import type { DayMinutes } from '@/utils/timeStats'
import { formatMinutes } from '@/utils/timeStats'

interface CodingTimeChartProps {
  days: DayMinutes[]
  target: number
}

const axisTick = { fill: 'var(--subtle)', fontSize: 12 }

/** Minutes coded per day. Bars that reach the daily target are filled solid. */
export const CodingTimeChart = ({ days, target }: CodingTimeChartProps) => {
  if (days.every((d) => d.minutes === 0)) {
    return (
      <div className="grid h-56 place-items-center text-center text-sm text-subtle">
        <p>No coding sessions in the last 7 days.</p>
      </div>
    )
  }

  const data = days.map((d) => ({ weekday: d.weekday, minutes: Math.round(d.minutes) }))

  return (
    <div className="h-56" role="img" aria-label="Bar chart of coding minutes per day for the last 7 days">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap="28%" margin={{ top: 8, right: 4, bottom: 0, left: -12 }}>
          <CartesianGrid vertical={false} stroke="var(--line)" />
          <XAxis dataKey="weekday" tickLine={false} axisLine={false} tick={axisTick} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={axisTick} width={40} />
          <Tooltip
            cursor={{ fill: 'var(--sunken)' }}
            formatter={(value) => [formatMinutes(Number(value)), 'Coded']}
            contentStyle={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 8,
              color: 'var(--ink)',
              fontSize: 13,
            }}
          />
          <ReferenceLine y={target} stroke="var(--subtle)" strokeDasharray="4 4" />
          <Bar dataKey="minutes" radius={[4, 4, 0, 0]} isAnimationActive={false}>
            {data.map((d) => (
              <Cell key={d.weekday} fill={d.minutes >= target ? 'var(--brand)' : 'var(--cell-2)'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CodingTimeChart
