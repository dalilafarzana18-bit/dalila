
export interface Task {
  id: string;
  subject: string;
  date: string;
  time: string;
  notes?: string;
  completed: boolean;
  reminderOffset?: number; // Days before due date to suggest study
}

export enum AppView {
  SPLASH = 'SPLASH',
  ONBOARDING = 'ONBOARDING',
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
  ADD_TASK = 'ADD_TASK',
  PROGRESS = 'PROGRESS',
  SETTINGS = 'SETTINGS',
  FOCUS = 'FOCUS'
}

export enum FontSize {
  SMALL = 'text-sm',
  MEDIUM = 'text-base',
  LARGE = 'text-lg'
}
