import { useGoals } from '@/hooks/useGoals'
import GoalCard from '@/components/goals/GoalCard'
import GoalForm from '@/components/goals/GoalForm'
import MetricStrip from '@/components/cards/MetricStrip'
import PageHeader from '@/components/layout/PageHeader'

export const Goals = () => {
  const { goals, addGoal, deleteGoal, updateProgress, getGoalProgress, getCompletedGoals } = useGoals()

  const completedGoals = getCompletedGoals()
  const activeGoals = goals.filter((g) => completedGoals.every((c) => c.id !== g.id))

  return (
    <>
      <PageHeader
        title="Goals"
        description="Set a target, nudge the number as you go, and finish before the deadline."
      />

      <div className="space-y-8">
        <GoalForm onSubmit={addGoal} />

        {goals.length > 0 && (
          <MetricStrip
            items={[
              { label: 'Total', value: goals.length },
              { label: 'In progress', value: activeGoals.length },
              { label: 'Completed', value: completedGoals.length },
            ]}
          />
        )}

        {activeGoals.length > 0 && (
          <section aria-labelledby="active-goals">
            <h2 id="active-goals" className="mb-4 text-lg font-semibold">
              In progress
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {activeGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  progress={getGoalProgress(goal.id)}
                  onUpdate={(current) => updateProgress(goal.id, current)}
                  onDelete={() => deleteGoal(goal.id)}
                  isCompleted={false}
                />
              ))}
            </div>
          </section>
        )}

        {completedGoals.length > 0 && (
          <section aria-labelledby="completed-goals">
            <h2 id="completed-goals" className="mb-4 text-lg font-semibold">
              Completed
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {completedGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  progress={100}
                  onUpdate={(current) => updateProgress(goal.id, current)}
                  onDelete={() => deleteGoal(goal.id)}
                  isCompleted
                />
              ))}
            </div>
          </section>
        )}

        {goals.length === 0 && (
          <div className="rounded-xl border border-dashed border-line px-6 py-14 text-center">
            <p className="text-lg font-semibold">No goals yet</p>
            <p className="mx-auto mt-1 max-w-sm text-subtle">
              Choose one thing you can count, like problems solved or hours coded, and give it a deadline.
            </p>
          </div>
        )}
      </div>
    </>
  )
}

export default Goals
