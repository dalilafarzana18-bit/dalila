
import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Clock, BarChart2, Plus, Settings, Timer, X, Bell, Info } from 'lucide-react';
import { Task, AppView } from '../types';

interface DashboardViewProps {
  userName: string;
  tasks: Task[];
  onAddTask: () => void;
  onNavigate: (view: AppView) => void;
  toggleTask: (id: string) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ userName, tasks, onAddTask, onNavigate, toggleTask }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notifTask, setNotifTask] = useState<Task | null>(null);

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  useEffect(() => {
    // Check for tasks due today or tomorrow
    const checkUpcoming = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const upcomingTask = tasks.find(t => {
        if (t.completed) return false;
        const taskDate = new Date(t.date);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate.getTime() === today.getTime() || taskDate.getTime() === tomorrow.getTime();
      });

      if (upcomingTask) {
        setNotifTask(upcomingTask);
        setShowNotification(true);
        const timer = setTimeout(() => setShowNotification(false), 6000);
        return () => clearTimeout(timer);
      }
    };

    if (tasks.length > 0) {
      const timeout = setTimeout(checkUpcoming, 1500); // Slight delay for entrance effect
      return () => clearTimeout(timeout);
    }
  }, [tasks]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-darkBg overflow-hidden relative">
      {/* Notification Popup */}
      {showNotification && notifTask && (
        <div className="absolute top-10 left-6 right-6 z-50 animate-in slide-in-from-top duration-500">
          <div className="bg-primary text-white p-5 rounded-[2rem] shadow-2xl flex items-center gap-4 border-2 border-white/20">
            <div className="p-3 bg-white/20 rounded-2xl">
              <Bell className="w-6 h-6 animate-ring" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wider opacity-80">Deadline approaching!</p>
              <p className="font-bold truncate">{notifTask.subject} is due soon.</p>
            </div>
            <button 
              onClick={() => setShowNotification(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white dark:bg-darkCard px-6 pt-12 pb-6 flex justify-between items-center border-b border-gray-50 dark:border-gray-800">
        <div>
          <h1 className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-1">Study Planner</h1>
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">Hello, {userName}!</h2>
        </div>
        <button onClick={() => onNavigate(AppView.SETTINGS)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
          <Settings className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="p-6 grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-darkCard p-4 rounded-3xl flex flex-col items-center shadow-sm">
          <span className="text-primary text-3xl font-bold">{tasks.length}</span>
          <span className="text-xs text-gray-500 uppercase font-medium">Total tasks</span>
        </div>
        <div className="bg-white dark:bg-darkCard p-4 rounded-3xl flex flex-col items-center shadow-sm">
          <span className="text-primary text-3xl font-bold">{completedCount}</span>
          <span className="text-xs text-gray-500 uppercase font-medium">Completed</span>
        </div>
        <div className="bg-white dark:bg-darkCard p-4 rounded-3xl flex flex-col items-center shadow-sm">
          <span className="text-primary text-3xl font-bold">{pendingCount}</span>
          <span className="text-xs text-gray-500 uppercase font-medium">Pending</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-serif font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
            Deadlines
          </h2>
          {tasks.some(t => !t.completed && t.reminderOffset) && (
            <div className="flex items-center gap-1 text-primary text-[10px] font-bold uppercase">
              <Info className="w-3 h-3" />
              Reminders Active
            </div>
          )}
        </div>

        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-darkCard rounded-[2rem] border-2 border-dashed border-gray-100 dark:border-gray-800">
              <p className="text-gray-400 font-serif">No tasks scheduled yet.</p>
            </div>
          ) : (
            tasks.map(task => (
              <div 
                key={task.id} 
                className={`flex items-center p-6 rounded-[2rem] transition-all cursor-pointer ${
                  task.completed ? 'bg-primary/5 border border-primary/10 opacity-60' : 'bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.02]'
                }`}
                onClick={() => toggleTask(task.id)}
              >
                <div className={`p-4 rounded-2xl mr-6 ${task.completed ? 'bg-primary/20' : 'bg-white/20'}`}>
                  {task.completed ? <CheckCircle2 className="w-8 h-8 text-primary" /> : <Calendar className="w-8 h-8" />}
                </div>
                <div className="flex-1 overflow-hidden">
                  <h3 className={`text-xl font-serif font-bold truncate ${task.completed ? 'text-primary' : 'text-white'}`}>
                    {task.subject}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className={`text-xs opacity-90 font-medium ${task.completed ? 'text-gray-500' : 'text-white/90'}`}>
                      {new Date(task.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }).toUpperCase()} • {task.time}
                    </p>
                    {!task.completed && task.reminderOffset !== undefined && (
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
                        {task.reminderOffset}D REMINDER
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-4 mt-8">
          <button className="flex-1 bg-white dark:bg-darkCard text-primary border border-primary/20 py-3 rounded-2xl font-bold text-sm shadow-sm active:bg-primary active:text-white transition-colors">TODAY</button>
          <button className="flex-1 bg-white dark:bg-darkCard text-primary border border-primary/20 py-3 rounded-2xl font-bold text-sm shadow-sm active:bg-primary active:text-white transition-colors">THIS WEEK</button>
          <button className="flex-1 bg-white dark:bg-darkCard text-primary border border-primary/20 py-3 rounded-2xl font-bold text-sm shadow-sm active:bg-primary active:text-white transition-colors">ALL</button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 w-full bg-white dark:bg-darkCard border-t border-gray-100 dark:border-gray-800 px-6 py-4 flex justify-between items-center z-40">
        <button className="flex flex-col items-center text-primary" onClick={() => onNavigate(AppView.DASHBOARD)}>
          <Clock className="w-8 h-8 mb-1" />
          <span className="text-[10px] font-bold uppercase">Schedule</span>
        </button>
        <button className="flex flex-col items-center text-gray-400" onClick={() => onNavigate(AppView.PROGRESS)}>
          <BarChart2 className="w-8 h-8 mb-1" />
          <span className="text-[10px] font-bold uppercase">Progress</span>
        </button>
        
        <button 
          onClick={onAddTask}
          className="bg-primary p-5 rounded-full -mt-16 border-[6px] border-white dark:border-darkBg shadow-2xl active:scale-90 transition-transform"
        >
          <Plus className="w-10 h-10 text-white" />
        </button>

        <button className="flex flex-col items-center text-gray-400" onClick={() => onNavigate(AppView.FOCUS)}>
          <Timer className="w-8 h-8 mb-1" />
          <span className="text-[10px] font-bold uppercase">Focus</span>
        </button>
        <button className="flex flex-col items-center text-gray-400" onClick={() => onNavigate(AppView.SETTINGS)}>
          <Settings className="w-8 h-8 mb-1" />
          <span className="text-[10px] font-bold uppercase">Settings</span>
        </button>
      </div>

      <style>{`
        @keyframes ring {
          0% { transform: rotate(0); }
          5% { transform: rotate(15deg); }
          10% { transform: rotate(-15deg); }
          15% { transform: rotate(10deg); }
          20% { transform: rotate(-10deg); }
          25% { transform: rotate(0); }
          100% { transform: rotate(0); }
        }
        .animate-ring {
          animation: ring 2s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default DashboardView;
