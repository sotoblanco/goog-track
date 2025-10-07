
import React from 'react';
import { DailyScore, CategoryScore } from '../types';
import { getCategoryColor } from '../constants';
import { TrophyIcon, Bars3Icon, TagIcon } from './Icons';

interface LeaderboardProps {
  scores: DailyScore[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ scores }) => {
  const today = new Date();
  today.setHours(0,0,0,0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const todayStr = today.toISOString().split('T')[0];
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  const defaultScore = { score: 0, tasksCompleted: 0 };
  const todayScore = scores.find(s => s.date === todayStr) ?? defaultScore;
  const yesterdayScore = scores.find(s => s.date === yesterdayStr) ?? defaultScore;

  const bestDay = scores.reduce((best, current) => {
    return current.score > best.score ? current : best;
  }, { date: '', score: 0, tasksCompleted: 0 });

  const rankedScores = [...scores]
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score || b.tasksCompleted - a.tasksCompleted);

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700 space-y-6">
      <h2 className="text-2xl font-extrabold uppercase text-center text-white">Daily Leaderboard</h2>
      
      {bestDay.score > 0 && (
        <div className="bg-yellow-500/10 border-2 border-yellow-500 p-4 rounded-lg text-center">
            <h3 className="text-lg font-bold text-yellow-400 uppercase flex items-center justify-center gap-2">
                <TrophyIcon className="w-6 h-6" />
                Best Day Ever
            </h3>
            <p className="text-sm text-gray-400">{new Date(bestDay.date + 'T00:00:00').toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            <div className="flex justify-center gap-6 mt-2">
                <div>
                    <p className="text-3xl font-black text-white">{bestDay.score}</p>
                    <p className="text-xs text-gray-400 uppercase">Points</p>
                </div>
                <div>
                    <p className="text-3xl font-black text-white">{bestDay.tasksCompleted}</p>
                    <p className="text-xs text-gray-400 uppercase">Missions</p>
                </div>
            </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-400 uppercase font-bold">Yesterday</p>
            <p className="text-3xl font-black text-white">{yesterdayScore.score}</p>
            <p className="text-xs text-gray-400">{yesterdayScore.tasksCompleted} missions</p>
        </div>
        <div className={`p-4 rounded ${todayScore.score > yesterdayScore.score && todayScore.score > 0 ? 'bg-green-500/20 border-2 border-green-500' : 'bg-orange-500/20 border-2 border-orange-500'}`}>
            <p className="text-sm uppercase font-bold text-orange-400">Today</p>
            <p className="text-3xl font-black text-white">{todayScore.score}</p>
            <p className="text-xs text-gray-400">{todayScore.tasksCompleted} missions</p>
        </div>
      </div>

      {rankedScores.length > 0 && (
        <div className="pt-4">
          <h3 className="text-lg font-bold text-gray-200 uppercase flex items-center justify-center gap-2 mb-4">
            <Bars3Icon className="w-6 h-6" />
            All-Time Rankings
          </h3>
          <div className="max-h-80 overflow-y-auto bg-gray-900/50 rounded-lg border border-gray-700">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-400 uppercase bg-gray-700/50 sticky top-0 backdrop-blur-sm">
                <tr>
                  <th scope="col" className="px-4 py-3 text-center">#</th>
                  <th scope="col" className="px-4 py-3">Date</th>
                  <th scope="col" className="px-4 py-3 text-right">Points</th>
                  <th scope="col" className="px-4 py-3 text-right">Missions</th>
                </tr>
              </thead>
              <tbody>
                {rankedScores.map((score, index) => (
                  <tr key={score.date} className="border-b border-gray-700 hover:bg-gray-800/50">
                    <td className="px-4 py-2 font-bold text-center text-white">{index + 1}</td>
                    <td className="px-4 py-2 text-gray-300">
                      {new Date(score.date + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: '2-digit' })}
                    </td>
                    <td className="px-4 py-2 font-bold text-orange-400 text-right">{score.score}</td>
                    <td className="px-4 py-2 text-blue-400 text-right">{score.tasksCompleted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

interface CategoryLeaderboardProps {
    scores: CategoryScore[];
}

export const CategoryLeaderboard: React.FC<CategoryLeaderboardProps> = ({ scores }) => {
    const rankedScores = [...scores].sort((a, b) => b.score - a.score || b.tasksCompleted - a.tasksCompleted);

    if (rankedScores.length === 0) {
        return null;
    }

    return (
        <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700">
            <h3 className="text-lg font-bold text-gray-200 uppercase flex items-center justify-center gap-2 mb-4">
                <TagIcon className="w-6 h-6" />
                Category Rankings
            </h3>
            <div className="max-h-80 overflow-y-auto bg-gray-900/50 rounded-lg border border-gray-700">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700/50 sticky top-0 backdrop-blur-sm">
                        <tr>
                            <th scope="col" className="px-4 py-3 text-center">#</th>
                            <th scope="col" className="px-4 py-3">Category</th>
                            <th scope="col" className="px-4 py-3 text-right">Points</th>
                            <th scope="col" className="px-4 py-3 text-right">Missions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankedScores.map((score, index) => {
                            const categoryColor = getCategoryColor(score.category);
                            return (
                                <tr key={score.category} className="border-b border-gray-700 hover:bg-gray-800/50">
                                    <td className="px-4 py-2 font-bold text-center text-white">{index + 1}</td>
                                    <td className="px-4 py-2">
                                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${categoryColor.bg} ${categoryColor.text}`}>
                                          {score.category}
                                      </span>
                                    </td>
                                    <td className="px-4 py-2 font-bold text-orange-400 text-right">{score.score}</td>
                                    <td className="px-4 py-2 text-blue-400 text-right">{score.tasksCompleted}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
