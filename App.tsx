
import React, { useState, useEffect, useCallback } from 'react';
import { AppView, Task, FontSize } from './types';
import SplashView from './views/SplashView';
import OnboardingView from './views/OnboardingView';
import AuthView from './views/AuthView';
import DashboardView from './views/DashboardView';
import AddTaskView from './views/AddTaskView';
import ProgressView from './views/ProgressView';
import SettingsView from './views/SettingsView';
import FocusView from './views/FocusView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.SPLASH);
  const [userName, setUserName] = useState<string | null>(localStorage.getItem('study_planner_user'));
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('study_planner_logged_in'));
  
  // Initialize as empty array for first-time users as requested
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('study_planner_tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>(FontSize.MEDIUM);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('study_planner_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenOnboarding = localStorage.getItem('onboarding_complete');
      if (!hasSeenOnboarding) {
        setCurrentView(AppView.ONBOARDING);
      } else if (!isLoggedIn) {
        setCurrentView(AppView.AUTH);
      } else {
        setCurrentView(AppView.DASHBOARD);
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [isLoggedIn]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const completeOnboarding = () => {
    localStorage.setItem('onboarding_complete', 'true');
    setCurrentView(AppView.AUTH);
  };

  const handleAuthSuccess = (name: string) => {
    localStorage.setItem('study_planner_user', name);
    localStorage.setItem('study_planner_logged_in', 'true');
    setUserName(name);
    setIsLoggedIn(true);
    setCurrentView(AppView.DASHBOARD);
  };

  const addTask = useCallback((task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substr(2, 9)
    };
    setTasks(prev => [...prev, newTask]);
    setCurrentView(AppView.DASHBOARD);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }, []);

  const renderView = () => {
    switch (currentView) {
      case AppView.SPLASH:
        return <SplashView />;
      case AppView.ONBOARDING:
        return <OnboardingView onComplete={completeOnboarding} />;
      case AppView.AUTH:
        return <AuthView onAuthSuccess={handleAuthSuccess} />;
      case AppView.DASHBOARD:
        return <DashboardView 
          userName={userName || 'Student'}
          tasks={tasks} 
          onAddTask={() => setCurrentView(AppView.ADD_TASK)} 
          onNavigate={(view) => setCurrentView(view)}
          toggleTask={toggleTask}
        />;
      case AppView.ADD_TASK:
        return <AddTaskView 
          onSave={addTask} 
          onCancel={() => setCurrentView(AppView.DASHBOARD)} 
        />;
      case AppView.PROGRESS:
        return <ProgressView 
          tasks={tasks} 
          onBack={() => setCurrentView(AppView.DASHBOARD)} 
        />;
      case AppView.SETTINGS:
        return <SettingsView 
          onBack={() => setCurrentView(AppView.DASHBOARD)}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          fontSize={fontSize}
          setFontSize={setFontSize}
          isNotificationsEnabled={isNotificationsEnabled}
          setIsNotificationsEnabled={setIsNotificationsEnabled}
          isOfflineMode={isOfflineMode}
          setIsOfflineMode={setIsOfflineMode}
        />;
      case AppView.FOCUS:
        return <FocusView onBack={() => setCurrentView(AppView.DASHBOARD)} />;
      default:
        return <DashboardView 
          userName={userName || 'Student'}
          tasks={tasks} 
          onAddTask={() => setCurrentView(AppView.ADD_TASK)} 
          onNavigate={(view) => setCurrentView(view)}
          toggleTask={toggleTask}
        />;
    }
  };

  return (
    <div className={`min-h-screen max-w-md mx-auto shadow-2xl relative overflow-hidden font-sans ${fontSize} text-gray-900 dark:text-gray-100`}>
      {renderView()}
    </div>
  );
};

export default App;
