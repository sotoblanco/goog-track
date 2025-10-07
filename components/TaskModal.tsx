import React, { useState } from 'react';
import { TaskDifficulty } from '../types';

interface TaskInputProps {
  onAddTask: (task: { description: string, difficulty: TaskDifficulty, date: string, category: string }) => void;
  userCategories: string[];
}

export const TaskInput: React.FC<TaskInputProps> = ({ onAddTask, userCategories }) => {
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<TaskDifficulty>(TaskDifficulty.MEDIUM);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() && date && category.trim()) {
      onAddTask({ description, difficulty, date, category: category.trim() });
      setDescription('');
      setDifficulty(TaskDifficulty.MEDIUM);
      setCategory('');
    }
  };
  
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-2xl font-extrabold uppercase text-center mb-4 text-white">ADD A NEW MISSION</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What's the mission? Get specific."
          className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          aria-label="New task description"
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="task-date" className="block text-sm font-medium text-gray-400 mb-1">Date</label>
            <input
              type="date"
              id="task-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Task date"
              required
            />
          </div>
          <div>
            <label htmlFor="task-difficulty" className="block text-sm font-medium text-gray-400 mb-1">Difficulty</label>
            <select
              id="task-difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as TaskDifficulty)}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Task difficulty"
            >
              {Object.values(TaskDifficulty).map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-1">
            <label htmlFor="task-category" className="block text-sm font-medium text-gray-400 mb-1">Category</label>
            <input
              id="task-category"
              type="text"
              list="category-list"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Physical Training"
              className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Task category"
              required
            />
            <datalist id="category-list">
              {userCategories.map(c => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition-colors h-[42px]">Add Mission</button>
          </div>
        </div>
      </form>
    </div>
  );
};
