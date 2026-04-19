import { useGoals } from '@/hooks/useGoals'
import GoalCard from '@/components/goals/GoalCard'
import GoalForm from '@/components/goals/GoalForm'

export const Goals = () => {
  const { goals, addGoal, deleteGoal, updateProgress, getGoalProgress, getCompletedGoals } =
    useGoals()

  const completedGoals = getCompletedGoals()
  const activeGoals = goals.filter((g) => getCompletedGoals().every((c) => c.id !== g.id))

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Goals</h1>
        <p className="text-gray-600">Track your development and learning goals</p>
      </div>

      {/* Goal Form */}
      <GoalForm onSubmit={addGoal} />

      {/* Statistics */}
      {goals.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 text-center">
            <p className="text-3xl font-bold text-blue-600">{goals.length}</p>
            <p className="text-sm text-gray-600">Total Goals</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200 text-center">
            <p className="text-3xl font-bold text-green-600">{completedGoals.length}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200 text-center">
            <p className="text-3xl font-bold text-purple-600">{activeGoals.length}</p>
            <p className="text-sm text-gray-600">In Progress</p>
          </div>
        </div>
      )}

      {/* Active Goals */}
      {activeGoals.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Active Goals</h2>
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
          <h2 className="text-2xl font-bold">🎉 Completed Goals</h2>
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
        <div className="text-center py-12">
          <p className="text-5xl mb-4">🎯</p>
          <p className="text-gray-600 text-lg">No goals yet. Create your first goal to get started!</p>
        </div>
      )}
    </div>
  )
}

export default Goals
