
import React, { useState, useMemo } from 'react';
import { CalendarContainer, CalendarViewType } from './components/CalendarView';
import { TaskInput } from './components/TaskModal';
import { Leaderboard, CategoryLeaderboard } from './components/Leaderboard';
import { MotivationCorner } from './components/MotivationModal';
import { Header } from './components/Header';
import useLocalStorage from './hooks/useLocalStorage';
import { Task, TaskDifficulty, DailyScore, CategoryScore } from './types';
import { generateGogginsStory } from './services/geminiService';
import { DIFFICULTY_POINTS } from './constants';

const App: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<{ [key: string]: Task[] }>('goggins_tasks', {});
  const [userCategories, setUserCategories] = useLocalStorage<string[]>('goggins_categories', [
    'Physical Training',
    'Mental Fortitude',
    'Discipline',
    'Uncomfortable Zone',
  ]);
  const [motivationalStory, setMotivationalStory] = useState('');
  const [isLoadingStory, setIsLoadingStory] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [calendarView, setCalendarView] = useState<CalendarViewType>('month');

  const dailyScores = useMemo<DailyScore[]>(() => {
    return Object.entries(tasks).map(([date, dateTasks]) => {
      const completedTasks = dateTasks.filter(task => task.completed);
      const score = completedTasks
        .reduce((sum, task) => sum + (DIFFICULTY_POINTS[task.difficulty] || 0), 0);
      const tasksCompleted = completedTasks.length;
      return { date, score, tasksCompleted };
    });
  }, [tasks]);

  const categoryScores = useMemo<CategoryScore[]>(() => {
    const stats: { [key: string]: { score: number; tasksCompleted: number } } = {};

    Object.values(tasks).flat().forEach(task => {
        if (task.completed) {
            if (!stats[task.category]) {
                stats[task.category] = { score: 0, tasksCompleted: 0 };
            }
            stats[task.category].score += DIFFICULTY_POINTS[task.difficulty] || 0;
            stats[task.category].tasksCompleted += 1;
        }
    });

    return Object.entries(stats).map(([category, data]) => ({
        category,
        ...data,
    }));
  }, [tasks]);

  const handleGetMotivation = async (task: { description: string, difficulty: TaskDifficulty, category: string }) => {
    setMotivationalStory('');
    setIsLoadingStory(true);
    const story = await generateGogginsStory(task);
    setMotivationalStory(story);
    setIsLoadingStory(false);
  };

  const addTask = (task: { description: string, difficulty: TaskDifficulty, date: string, category: string }) => {
    const { date, ...newTaskDetails } = task;
    const key = date;
    
    if (!userCategories.find(c => c.toLowerCase() === task.category.toLowerCase())) {
        setUserCategories(prev => [...prev, task.category]);
    }

    const newTask: Task = { ...newTaskDetails, id: crypto.randomUUID(), completed: false };
    setTasks(prev => {
      const updatedTasks = { ...prev };
      updatedTasks[key] = [...(updatedTasks[key] || []), newTask];
      return updatedTasks;
    });

    handleGetMotivation(newTaskDetails);
    setSelectedDate(date);
    setCalendarView('day');
  };

  const toggleTask = (date: string, taskId: string) => {
    const key = date;
    if (!key) return;

    setTasks(prev => ({
      ...prev,
      [key]: prev[key].map(t => t.id === taskId ? { ...t, completed: !t.completed } : t),
    }));
  };
  
  const deleteTask = (date: string, taskId: string) => {
    const key = date;
    if (!key) return;

    setTasks(prev => {
        const newTasksForDate = prev[key].filter(t => t.id !== taskId);
        const newTasks = {...prev};
        if(newTasksForDate.length > 0) {
            newTasks[key] = newTasksForDate;
        } else {
            delete newTasks[key];
        }
        return newTasks;
    });
  };

  const tasksForSelectedDay = useMemo(() => {
    return tasks[selectedDate] || [];
  }, [tasks, selectedDate]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setCalendarView('day');
  };


  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <Header />
      <main className="max-w-7xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <TaskInput onAddTask={addTask} userCategories={userCategories} />
            <MotivationCorner story={motivationalStory} isLoading={isLoadingStory} />
            <div>
              <CalendarContainer
                view={calendarView}
                onViewChange={setCalendarView}
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                scores={dailyScores}
                tasksForDay={tasksForSelectedDay}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
              />
            </div>
        </div>
        <div className="lg:col-span-1 space-y-8">
          <Leaderboard scores={dailyScores} />
          <CategoryLeaderboard scores={categoryScores} />
        </div>
      </main>
    </div>
  );
};

export default App;
