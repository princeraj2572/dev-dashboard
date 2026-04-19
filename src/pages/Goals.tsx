import { useGoals } from '@/hooks/useGoals'
import GoalCard from '@/components/goals/GoalCard'
import GoalForm from '@/components/goals/GoalForm'
import { Card } from '@/components/ui/card'
import Badge from '@/components/common/Badge'
import HeroSection from '@/components/common/HeroSection'
import MetricCard from '@/components/cards/MetricCard'

export const Goals = () => {
  const { goals, addGoal, deleteGoal, updateProgress, getGoalProgress, getCompletedGoals } =
    useGoals()

  const completedGoals = getCompletedGoals()
  const activeGoals = goals.filter((g) => getCompletedGoals().every((c) => c.id !== g.id))

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <HeroSection
        title="🎯 Goals & Objectives"
        subtitle="Track your development and learning goals"
        description="Set ambitious goals and monitor your progress as you build towards your vision."
        backgroundVariant="success"
      />

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Goal Form */}
        <GoalForm onSubmit={addGoal} />

        {/* Statistics */}
        {goals.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Total Goals"
              value={goals.length}
              icon="📋"
            />
            <MetricCard
              label="Completed"
              value={completedGoals.length}
              icon="✅"
              trend={{ direction: 'up', percentage: (completedGoals.length / Math.max(goals.length, 1)) * 100 }}
            />
            <MetricCard
              label="In Progress"
              value={activeGoals.length}
              icon="⚡"
            />
          </div>
        )}

        {/* Active Goals */}
        {activeGoals.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold dark:text-white">Active Goals</h2>
              <Badge variant="info">{activeGoals.length}</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>
        )}

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold dark:text-white">🎉 Completed Goals</h2>
              <Badge variant="success">{completedGoals.length}</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  progress={100}
                  onUpdate={(current) => updateProgress(goal.id, current)}
                  onDelete={() => deleteGoal(goal.id)}
                  isCompleted={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {goals.length === 0 && (
          <Card className="text-center py-16">
            <p className="text-6xl mb-4">🎯</p>
            <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
              No goals yet. Create your first goal to get started!
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Goals
