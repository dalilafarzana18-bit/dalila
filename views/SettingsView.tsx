
import React from 'react';
import { ArrowLeft, Moon, Bell, WifiOff, Type } from 'lucide-react';
import { FontSize } from '../types';

interface SettingsViewProps {
  onBack: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (v: boolean) => void;
  fontSize: FontSize;
  setFontSize: (v: FontSize) => void;
  isNotificationsEnabled: boolean;
  setIsNotificationsEnabled: (v: boolean) => void;
  isOfflineMode: boolean;
  setIsOfflineMode: (v: boolean) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ 
  onBack, isDarkMode, setIsDarkMode, fontSize, setFontSize,
  isNotificationsEnabled, setIsNotificationsEnabled, isOfflineMode, setIsOfflineMode
}) => {
  return (
    <div className="h-screen w-full bg-white dark:bg-darkBg flex flex-col overflow-hidden">
      <div className="bg-primary p-6 flex items-center shadow-lg">
        <button onClick={onBack} className="p-2 bg-white/20 rounded-lg text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-white flex-1 text-center pr-8">Settings</h2>
      </div>

      <div className="flex-1 p-6 space-y-8 overflow-y-auto">
        {/* Appearance */}
        <div className="bg-white dark:bg-darkCard p-6 rounded-[2rem] shadow-xl border border-gray-50 dark:border-gray-800 space-y-6">
          <h3 className="text-xl font-bold mb-4">Appearance</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                <Moon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="font-bold text-lg">Dark Mode</p>
                <p className="text-gray-500 text-sm">Enable Dark Theme</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                <Type className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="font-bold text-lg">Font Size</p>
                <p className="text-gray-500 text-sm">Adjust Text Size</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setFontSize(FontSize.SMALL)}
                className={`flex-1 py-4 rounded-2xl font-bold border-2 transition-all ${fontSize === FontSize.SMALL ? 'bg-primary/10 border-primary text-primary' : 'border-gray-100 dark:border-gray-800'}`}
              >
                SMALL
              </button>
              <button 
                onClick={() => setFontSize(FontSize.MEDIUM)}
                className={`flex-1 py-4 rounded-2xl font-bold border-2 transition-all ${fontSize === FontSize.MEDIUM ? 'bg-primary/10 border-primary text-primary' : 'border-gray-100 dark:border-gray-800'}`}
              >
                MEDIUM
              </button>
              <button 
                onClick={() => setFontSize(FontSize.LARGE)}
                className={`flex-1 py-4 rounded-2xl font-bold border-2 transition-all ${fontSize === FontSize.LARGE ? 'bg-primary/10 border-primary text-primary' : 'border-gray-100 dark:border-gray-800'}`}
              >
                LARGE
              </button>
            </div>
          </div>
        </div>

        {/* Notifications & Connectivity */}
        <div className="bg-white dark:bg-darkCard p-6 rounded-[2rem] shadow-xl border border-gray-50 dark:border-gray-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                <Bell className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="font-bold text-lg">Push Notifications</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={isNotificationsEnabled} onChange={() => setIsNotificationsEnabled(!isNotificationsEnabled)} />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                <WifiOff className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="font-bold text-lg">Offline Mode</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={isOfflineMode} onChange={() => setIsOfflineMode(!isOfflineMode)} />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
