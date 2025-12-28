
import React, { useState } from 'react';
import { Task } from '../types';
import { Bell, ChevronLeft } from 'lucide-react';

interface AddTaskViewProps {
  onSave: (task: Omit<Task, 'id'>) => void;
  onCancel: () => void;
}

const AddTaskView: React.FC<AddTaskViewProps> = ({ onSave, onCancel }) => {
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [reminderOffset, setReminderOffset] = useState(1);

  const handleSave = () => {
    if (!subject || !date || !time) return;
    onSave({ 
      subject, 
      date, 
      time, 
      notes, 
      completed: false,
      reminderOffset 
    });
  };

  return (
    <div className="h-screen w-full bg-white dark:bg-black flex flex-col">
      <div className="bg-primary p-6 flex items-center shadow-lg">
        <button onClick={onCancel} className="p-2 bg-white/20 rounded-lg text-white mr-4">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-white tracking-wide flex-1 text-center pr-10">New Task</h2>
      </div>

      <div className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Subject Name*</label>
          <input 
            type="text" 
            placeholder="e.g. UX DESIGN PROJECT"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-darkCard focus:border-primary outline-none text-lg transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Date*</label>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-darkCard focus:border-primary outline-none text-lg transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Time*</label>
            <input 
              type="time" 
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-darkCard focus:border-primary outline-none text-lg transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            Suggestion Day (Reminder)
          </label>
          <select 
            value={reminderOffset}
            onChange={(e) => setReminderOffset(Number(e.target.value))}
            className="w-full px-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-darkCard focus:border-primary outline-none text-lg transition-all appearance-none"
          >
            <option value={0}>Same day</option>
            <option value={1}>1 day before</option>
            <option value={2}>2 days before</option>
            <option value={3}>3 days before</option>
            <option value={7}>1 week before</option>
          </select>
          <p className="text-xs text-gray-400 italic ml-1">We'll notify you this many days before the deadline.</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Notes</label>
          <textarea 
            placeholder="Key points, requirements..."
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-darkCard focus:border-primary outline-none text-lg transition-all resize-none"
          />
        </div>
      </div>

      <div className="p-8 flex flex-col gap-4 bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800">
        <button 
          onClick={handleSave}
          className="w-full bg-primary text-white py-5 rounded-2xl text-xl font-bold shadow-xl shadow-primary/20 active:scale-95 transition-all"
        >
          SAVE TASK
        </button>
      </div>
    </div>
  );
};

export default AddTaskView;
