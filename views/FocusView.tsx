
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';

interface FocusViewProps {
  onBack: () => void;
}

const FocusView: React.FC<FocusViewProps> = ({ onBack }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-screen w-full bg-white dark:bg-darkBg flex flex-col overflow-hidden">
      <div className="bg-primary p-6 flex items-center shadow-lg relative z-10">
        <button onClick={onBack} className="p-2 bg-white/20 rounded-lg text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-white flex-1 text-center pr-8">Focus Mode</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="flex flex-col items-center justify-center space-y-20 w-full">
          {/* Time Display - Only text, no circle */}
          <div className="flex flex-col items-center">
            <span className="text-9xl font-bold font-serif tabular-nums text-primary drop-shadow-sm transition-all">
              {formatTime(timeLeft)}
            </span>
            <p className="mt-4 text-gray-400 font-bold uppercase tracking-[0.3em] text-sm">
              Focus Time
            </p>
          </div>

          <div className="flex gap-10">
            <button 
              onClick={toggleTimer}
              className={`w-24 h-24 rounded-full flex items-center justify-center text-white shadow-2xl active:scale-90 transition-all ${isActive ? 'bg-orange-400' : 'bg-primary'}`}
            >
              {isActive ? <Pause className="w-12 h-12" /> : <Play className="w-12 h-12 ml-1" />}
            </button>
            <button 
              onClick={resetTimer}
              className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 shadow-2xl active:scale-90 transition-all border border-gray-200 dark:border-gray-700"
            >
              <RotateCcw className="w-12 h-12" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusView;
