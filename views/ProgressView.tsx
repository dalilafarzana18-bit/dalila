
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Task } from '../types';

interface ProgressViewProps {
  tasks: Task[];
  onBack: () => void;
}

const ProgressView: React.FC<ProgressViewProps> = ({ tasks, onBack }) => {
  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.length - completed;
  const percent = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;

  const pieData = [
    { name: 'Completed', value: completed || 1 }, // Fallback to 1 if 0 just for visual structure if empty
    { name: 'Pending', value: pending },
  ];

  // Adjust data if no tasks exist to show an empty state circle
  const displayData = tasks.length === 0 
    ? [{ name: 'Empty', value: 1 }] 
    : pieData;

  return (
    <div className="h-screen w-full bg-white dark:bg-darkBg flex flex-col overflow-hidden">
      <div className="bg-primary p-6 flex items-center shadow-lg relative z-10">
        <button onClick={onBack} className="p-2 bg-white/20 rounded-lg text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-white flex-1 text-center pr-8">Progress Tracker</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Overall Completion Card */}
        <div className="bg-primary/20 dark:bg-darkCard p-8 rounded-[2.5rem] shadow-sm">
          <h3 className="text-xl font-medium mb-8">Overall Completion</h3>
          <div className="flex flex-col items-center">
            {/* 
                Fixed: The container now has explicit min-width and min-height 
                to satisfy Recharts ResponsiveContainer requirements. 
            */}
            <div className="relative w-56 h-56 mb-8 flex items-center justify-center" style={{ minWidth: '224px', minHeight: '224px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={224} height={224}>
                  <Pie
                    data={displayData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                    isAnimationActive={true}
                  >
                    {tasks.length === 0 ? (
                       <Cell fill="#E5E7EB" className="dark:fill-gray-700" />
                    ) : (
                      <>
                        <Cell fill="#00C2CB" />
                        <Cell fill="#E5E7EB" className="dark:fill-gray-700" />
                      </>
                    )}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-5xl font-bold text-primary">{percent}%</span>
                <span className="text-sm text-gray-500 uppercase tracking-widest font-bold">completed</span>
              </div>
            </div>

            <div className="flex w-full gap-4">
              <div className="flex-1 bg-primary p-6 rounded-3xl flex flex-col items-center text-white">
                <span className="text-3xl font-bold">{completed}</span>
                <span className="text-sm font-medium">completed</span>
              </div>
              <div className="flex-1 bg-primary/80 p-6 rounded-3xl flex flex-col items-center text-white">
                <span className="text-3xl font-bold">{pending}</span>
                <span className="text-sm font-medium">pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressView;
