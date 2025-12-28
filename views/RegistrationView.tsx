
import React, { useState } from 'react';
import { User, ArrowRight } from 'lucide-react';

interface RegistrationViewProps {
  onRegister: (name: string) => void;
}

const RegistrationView: React.FC<RegistrationViewProps> = ({ onRegister }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onRegister(name.trim());
    }
  };

  return (
    <div className="h-screen w-full bg-white dark:bg-black p-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-sm space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex p-5 bg-primary/10 rounded-[2rem] mb-4">
            <User className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-4xl font-serif font-bold text-gray-900 dark:text-white">
            What should we call you?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Tell us your name to personalize your study experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative group">
            <input
              autoFocus
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-800 py-4 text-3xl font-serif focus:border-primary outline-none transition-all text-center"
            />
          </div>

          <button
            disabled={!name.trim()}
            className="w-full bg-primary disabled:bg-gray-200 dark:disabled:bg-gray-800 text-white py-5 rounded-[2rem] text-2xl font-bold flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all"
          >
            Get Started <ArrowRight className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationView;
