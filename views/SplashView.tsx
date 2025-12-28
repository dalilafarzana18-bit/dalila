
import React from 'react';
import { GraduationCap } from 'lucide-react';

const SplashView: React.FC = () => {
  return (
    <div className="h-screen w-full bg-primary flex flex-col items-center justify-center animate-pulse">
      <GraduationCap className="w-48 h-48 text-white mb-8" strokeWidth={1.5} />
      <h1 className="text-white text-4xl font-serif">Hello!</h1>
    </div>
  );
};

export default SplashView;
