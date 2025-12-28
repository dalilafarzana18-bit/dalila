
import React from 'react';
import { GraduationCap } from 'lucide-react';

interface OnboardingViewProps {
  onComplete: () => void;
}

const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete }) => {
  return (
    <div className="h-screen w-full bg-white dark:bg-black flex flex-col items-center justify-between p-8">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        {/* Decorative elements to match screenshot */}
        <div className="relative">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"></div>
          
          <div className="bg-white dark:bg-darkCard p-12 rounded-[2.5rem] shadow-2xl relative z-10">
            <GraduationCap className="w-24 h-24 text-primary" strokeWidth={2} />
          </div>
          
          <div className="absolute top-4 -right-8 animate-bounce">
            <span className="text-4xl">👏</span>
          </div>
          <div className="absolute bottom-4 -left-8 animate-bounce">
            <span className="text-4xl">✌️</span>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-medium mb-4">Your planner's ready to go!</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-[80%] mx-auto">
            Organization & self-management aren't just helpful—they've been shown to increase academic progress by as much as 2.4x. With study planner, you've got the tools to make it happen.
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col items-center pb-8">
        <div className="flex space-x-2 mb-10">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
        
        <button 
          onClick={onComplete}
          className="w-full bg-primary text-white py-4 rounded-2xl text-xl font-semibold shadow-lg active:scale-95 transition-transform"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default OnboardingView;
