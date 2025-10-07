
import React, { useState } from 'react';
import { Task, TaskDifficulty, DailyScore } from '../types';
import { DIFFICULTY_POINTS, getCategoryColor } from '../constants';
import { TrashIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

export type CalendarViewType = 'month' | 'week' | 'day';

// --- Date Helper Functions ---
const getDayWithSuffix = (day: number) => {
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
      case 1: return `${day}st`;
      case 2: return `${day}nd`;
      case 3: return `${day}rd`;
      default: return `${day}th`;
    }
};

const getScoreColor = (score: number) => {
    if (score === 0) return 'bg-gray-800 hover:bg-gray-700';
    if (score <= 20) return 'bg-red-900/60 hover:bg-red-800/80';
    if (score <= 50) return 'bg-yellow-800/70 hover:bg-yellow-700/90';
    if (score <= 100) return 'bg-green-800/70 hover:bg-green-700/90';
    return 'bg-green-600/80 hover:bg-green-500';
};

// --- TaskItem Component ---
const TaskItem: React.FC<{task: Task, date: string, onToggleTask: Function, onDeleteTask: Function}> = ({task, date, onToggleTask, onDeleteTask}) => {
    const isCompleted = task.completed;
    const categoryColor = getCategoryColor(task.category);
    
    const getDifficultyClass = (difficulty: TaskDifficulty) => {
        switch (difficulty) {
            case TaskDifficulty.EASY: return 'bg-blue-500';
            case TaskDifficulty.MEDIUM: return 'bg-yellow-500';
            case TaskDifficulty.HARD: return 'bg-red-600';
            case TaskDifficulty.SAVAGE: return 'bg-purple-600';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className={`flex items-center p-3 rounded transition-all duration-300 ${isCompleted ? 'bg-gray-900/50 opacity-60' : 'bg-gray-700'}`}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleTask(date, task.id)}
                className="w-6 h-6 mr-4 bg-gray-600 border-gray-500 rounded text-orange-500 focus:ring-orange-600 cursor-pointer flex-shrink-0"
                aria-labelledby={`task-desc-${task.id}`}
            />
            <div className="flex-grow">
                <p id={`task-desc-${task.id}`} className={`${isCompleted ? 'text-gray-400 line-through' : 'text-white'}`}>{task.description}</p>
                <div className="flex items-center flex-wrap text-xs text-gray-400 gap-x-2 gap-y-1 mt-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${getDifficultyClass(task.difficulty)}`}></span>
                      <span>{task.difficulty} ({DIFFICULTY_POINTS[task.difficulty]} pts)</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${categoryColor.bg} ${categoryColor.text}`}>
                        {task.category}
                    </span>
                </div>
            </div>
            <button onClick={() => onDeleteTask(date, task.id)} className="text-gray-500 hover:text-red-500 ml-4 transition-colors flex-shrink-0" aria-label={`Delete task: ${task.description}`}>
                <TrashIcon />
            </button>
        </div>
    );
}


// --- Day View ---
interface DayViewProps {
  tasksForDay: Task[];
  date: string;
  onToggleTask: (date: string, taskId: string) => void;
  onDeleteTask: (date: string, taskId: string) => void;
}
const DayView: React.FC<DayViewProps> = ({ tasksForDay, date, onToggleTask, onDeleteTask }) => {
  if (!tasksForDay || tasksForDay.length === 0) {
    return (
        <div className="text-center py-10">
            <p className="text-gray-400">No missions scheduled for this day.</p>
            <p className="text-gray-500 italic">Is it a rest day, or are you getting soft?</p>
        </div>
    )
  }

  const incompleteTasks = tasksForDay.filter(t => !t.completed);
  const completedTasks = tasksForDay.filter(t => t.completed);

  return (
    <div className="space-y-3 pt-4">
        {incompleteTasks.map(task => <TaskItem key={task.id} task={task} date={date} onToggleTask={onToggleTask} onDeleteTask={onDeleteTask} />)}
        {completedTasks.map(task => <TaskItem key={task.id} task={task} date={date} onToggleTask={onToggleTask} onDeleteTask={onDeleteTask} />)}
    </div>
  );
};


// --- Week View ---
interface WeekViewProps {
    displayDate: Date;
    scores: DailyScore[];
    selectedDate: string;
    onDateSelect: (date: string) => void;
}
const WeekView: React.FC<WeekViewProps> = ({ displayDate, scores, selectedDate, onDateSelect }) => {
    const scoresMap = new Map(scores.map(s => [s.date, s.score]));

    const startOfWeek = new Date(displayDate);
    startOfWeek.setDate(displayDate.getDate() - displayDate.getDay()); // Start on Sunday

    const weekDays = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        return date;
    });

    return (
        <div className="grid grid-cols-7 border-t border-l border-gray-700">
            {weekDays.map(date => {
                const dateStr = date.toISOString().split('T')[0];
                const score = scoresMap.get(dateStr) || 0;
                const isSelected = dateStr === selectedDate;
                const isToday = dateStr === new Date().toISOString().split('T')[0];

                return (
                    <div 
                        key={dateStr}
                        onClick={() => onDateSelect(dateStr)}
                        className={`p-2 h-28 flex flex-col justify-between cursor-pointer transition-all duration-200 border-r border-b border-gray-700 ${getScoreColor(score)}
                          ${isSelected ? 'ring-2 ring-offset-2 ring-offset-gray-900 ring-white' : ''}
                          ${isToday && !isSelected ? 'border-2 border-orange-500' : ''}`}
                    >
                        <span className={`text-sm font-bold ${isToday ? 'text-orange-400' : 'text-gray-300'}`}>
                            {date.toLocaleDateString('default', { weekday: 'short' })} {date.getDate()}
                        </span>
                        {score > 0 && <span className="text-lg font-black text-white self-end">{score}</span>}
                    </div>
                );
            })}
        </div>
    );
};


// --- Month View ---
interface MonthViewProps {
  displayDate: Date;
  scores: DailyScore[];
  selectedDate: string;
  onDateSelect: (date: string) => void;
}
const MonthView: React.FC<MonthViewProps> = ({ displayDate, scores, selectedDate, onDateSelect }) => {
    const scoresMap = new Map(scores.map(s => [s.date, s.score]));

    const startOfMonth = new Date(displayDate.getFullYear(), displayDate.getMonth(), 1);
    const endOfMonth = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0);
    const startDayOfWeek = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();

    const days = [];
    for (let i = 0; i < startDayOfWeek; i++) {
        days.push(<div key={`empty-start-${i}`} className="border-r border-b border-gray-700"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(displayDate.getFullYear(), displayDate.getMonth(), day);
        const dateStr = date.toISOString().split('T')[0];
        const score = scoresMap.get(dateStr) || 0;
        const isSelected = dateStr === selectedDate;
        const isToday = dateStr === new Date().toISOString().split('T')[0];

        days.push(
            <div key={day} onClick={() => onDateSelect(dateStr)}
                className={`p-2 h-20 flex flex-col justify-between cursor-pointer transition-all duration-200 border-r border-b border-gray-700 ${getScoreColor(score)}
                  ${isSelected ? 'ring-2 ring-offset-2 ring-offset-gray-900 ring-white' : ''}
                  ${isToday && !isSelected ? 'border-2 border-orange-500' : ''}`}
                role="button" aria-pressed={isSelected} aria-label={`Date ${date.toLocaleDateString()}, Score: ${score}`}
            >
                <span className={`text-sm font-bold self-start ${isToday ? 'text-orange-400' : 'text-gray-300'}`}>{day}</span>
                {score > 0 && <span className="text-lg font-black text-white self-end">{score}</span>}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-7 text-sm border-t border-l border-gray-700">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-bold uppercase text-gray-400 p-2 border-r border-b border-gray-700">{day}</div>
            ))}
            {days}
        </div>
    );
};


// --- Calendar Container ---
interface CalendarContainerProps {
    view: CalendarViewType;
    onViewChange: (view: CalendarViewType) => void;
    selectedDate: string;
    onDateSelect: (date: string) => void;
    scores: DailyScore[];
    tasksForDay: Task[];
    onToggleTask: (date: string, taskId: string) => void;
    onDeleteTask: (date: string, taskId: string) => void;
}
export const CalendarContainer: React.FC<CalendarContainerProps> = ({ view, onViewChange, selectedDate, onDateSelect, scores, tasksForDay, onToggleTask, onDeleteTask }) => {
    const [displayDate, setDisplayDate] = useState(new Date(selectedDate.replace(/-/g, '/')));

    const handleNav = (offset: number) => {
        setDisplayDate(prev => {
            const newDate = new Date(prev);
            if (view === 'month') newDate.setMonth(prev.getMonth() + offset);
            else if (view === 'week') newDate.setDate(prev.getDate() + offset * 7);
            else if (view === 'day') {
                const dayDate = new Date(selectedDate.replace(/-/g, '/'));
                dayDate.setDate(dayDate.getDate() + offset);
                onDateSelect(dayDate.toISOString().split('T')[0]);
                return dayDate;
            }
            return newDate;
        });
    };
    
    const renderHeaderTitle = () => {
        const date = view === 'day' ? new Date(selectedDate.replace(/-/g, '/')) : displayDate;
        if (view === 'month') return date.toLocaleString('default', { month: 'long', year: 'numeric' });
        if (view === 'week') {
            const start = new Date(date);
            start.setDate(date.getDate() - date.getDay());
            const end = new Date(start);
            end.setDate(start.getDate() + 6);
            return `${start.toLocaleString('default', { month: 'short' })} ${getDayWithSuffix(start.getDate())} - ${end.toLocaleString('default', { month: 'short' })} ${getDayWithSuffix(end.getDate())}, ${end.getFullYear()}`;
        }
        if (view === 'day') return date.toLocaleString('default', { weekday: 'long', month: 'long', day: 'numeric' });
        return '';
    };

    const ViewButton: React.FC<{targetView: CalendarViewType, children: React.ReactNode}> = ({ targetView, children }) => (
        <button
            onClick={() => onViewChange(targetView)}
            className={`px-3 py-1 text-sm font-bold rounded-md transition-colors ${view === targetView ? 'bg-orange-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
        >{children}</button>
    );

    return (
        <div className="bg-gray-800/50 p-4 rounded-lg shadow-lg border border-gray-700">
            <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-4">
                    <button onClick={() => handleNav(-1)} className="p-1 rounded-full hover:bg-gray-700 transition-colors" aria-label="Previous period"> <ChevronLeftIcon /> </button>
                    <h2 className="text-xl font-bold uppercase tracking-wider text-center min-w-[280px]"> {renderHeaderTitle()} </h2>
                    <button onClick={() => handleNav(1)} className="p-1 rounded-full hover:bg-gray-700 transition-colors" aria-label="Next period"> <ChevronRightIcon /> </button>
                </div>
                <div className="flex items-center gap-2">
                    <ViewButton targetView="month">Month</ViewButton>
                    <ViewButton targetView="week">Week</ViewButton>
                    <ViewButton targetView="day">Day</ViewButton>
                </div>
            </div>
            {view === 'month' && <MonthView displayDate={displayDate} scores={scores} selectedDate={selectedDate} onDateSelect={onDateSelect} />}
            {view === 'week' && <WeekView displayDate={displayDate} scores={scores} selectedDate={selectedDate} onDateSelect={onDateSelect} />}
            {view === 'day' && <DayView tasksForDay={tasksForDay} date={selectedDate} onToggleTask={onToggleTask} onDeleteTask={onDeleteTask} />}
        </div>
    );
};
