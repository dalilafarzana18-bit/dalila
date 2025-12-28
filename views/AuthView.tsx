
import React, { useState } from 'react';
import { Mail, Lock, User, GraduationCap, ArrowRight, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

interface AuthViewProps {
  onAuthSuccess: (name: string) => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onAuthSuccess }) => {
  // Check if an account already exists to determine default mode
  const accountExists = !!localStorage.getItem('study_planner_account_exists');
  const [isLogin, setIsLogin] = useState(accountExists);
  const [showPassword, setShowPassword] = useState(false);
  const [justSignedUp, setJustSignedUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSignUp = () => {
    // Simulate Account Creation
    localStorage.setItem('study_planner_account_exists', 'true');
    localStorage.setItem('study_planner_user', formData.name);
    localStorage.setItem('study_planner_email', formData.email);
    localStorage.setItem('study_planner_pass', formData.password);
    
    setJustSignedUp(true);
    setError(null);
    
    // Clear password so they have to enter it again
    setFormData(prev => ({ ...prev, password: '' }));

    setTimeout(() => {
      setIsLogin(true);
      setJustSignedUp(false);
    }, 2000);
  };

  const handleLogin = () => {
    const savedEmail = localStorage.getItem('study_planner_email');
    const savedPass = localStorage.getItem('study_planner_pass');
    const savedName = localStorage.getItem('study_planner_user') || 'Student';

    if (formData.email === savedEmail && formData.password === savedPass) {
      setError(null);
      onAuthSuccess(savedName);
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) setError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleMode = (login: boolean) => {
    setIsLogin(login);
    setError(null);
    setJustSignedUp(false);
  };

  return (
    <div className="h-screen w-full bg-white dark:bg-black p-8 flex flex-col overflow-y-auto">
      {/* Brand Header */}
      <div className="flex flex-col items-center mt-8 mb-6">
        <div className="bg-primary p-4 rounded-3xl shadow-lg mb-6">
          <GraduationCap className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-3xl font-serif font-bold tracking-tight text-gray-900 dark:text-white text-center">
          Study Planner
        </h1>
        <div className="h-14 mt-2 flex flex-col items-center justify-center text-center">
          {justSignedUp ? (
            <div className="flex items-center gap-2 text-green-500 font-bold animate-bounce">
              <CheckCircle className="w-5 h-5" />
              <span>Account created! Now log in.</span>
            </div>
          ) : error ? (
            <div className="flex items-center gap-2 text-red-500 font-medium px-4 py-2 bg-red-50 dark:bg-red-900/20 rounded-xl animate-shake">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          ) : (
            <p className="text-gray-500 max-w-[250px] text-sm leading-relaxed">
              {isLogin ? "Welcome back! Login to your account." : "Create an account to start your journey."}
            </p>
          )}
        </div>
      </div>

      {/* Auth Toggle */}
      <div className="flex bg-gray-100 dark:bg-darkCard p-1.5 rounded-2xl mb-8">
        <button 
          type="button"
          onClick={() => toggleMode(true)}
          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${isLogin ? 'bg-white dark:bg-gray-800 shadow-sm text-primary' : 'text-gray-500'}`}
        >
          LOGIN
        </button>
        <button 
          type="button"
          onClick={() => toggleMode(false)}
          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${!isLogin ? 'bg-white dark:bg-gray-800 shadow-sm text-primary' : 'text-gray-500'}`}
        >
          SIGN UP
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 flex-1">
        {!isLogin && (
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                required
                name="name"
                type="text" 
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-darkCard focus:border-primary outline-none transition-all"
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              required
              name="email"
              type="email" 
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-darkCard focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              required
              name="password"
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-12 pr-12 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-darkCard focus:border-primary outline-none transition-all"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 p-1 hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isLogin && (
          <div className="flex justify-end">
            <button type="button" className="text-xs font-bold text-primary hover:opacity-80 transition-opacity">
              FORGOT PASSWORD?
            </button>
          </div>
        )}

        <button 
          type="submit"
          disabled={justSignedUp}
          className={`w-full bg-primary text-white py-5 rounded-2xl text-xl font-bold shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-50 disabled:scale-100`}
        >
          {isLogin ? "LOGIN" : "CREATE ACCOUNT"}
          <ArrowRight className="w-6 h-6" />
        </button>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center pb-8">
        <p className="text-gray-500 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            type="button"
            onClick={() => toggleMode(!isLogin)}
            className="text-primary font-bold ml-1 hover:underline underline-offset-4"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default AuthView;
