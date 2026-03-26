import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Heart, Moon, Sun, Lock, Mail, ArrowRight, AlertCircle, Home } from 'lucide-react';

const mockUsers = [
  { email: 'superadmin@jayshreefoundation.org', password: 'super123', role: 'superadmin' as const, name: 'Rajesh Kumar', avatar: 'RK', id: 1 },
  { email: 'admin@jayshreefoundation.org', password: 'admin123', role: 'admin' as const, name: 'Priya Sharma', avatar: 'PS', id: 2 },
  { email: 'member@jayshreefoundation.org', password: 'member123', role: 'member' as const, name: 'Dr. Anjali Mehta', avatar: 'AM', id: 3 },
  { email: 'volunteer@jayshreefoundation.org', password: 'volunteer123', role: 'volunteer' as const, name: 'Rahul Sharma', avatar: 'RS', id: 4 },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme, setCurrentUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        setCurrentUser({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        });
        navigate(`/${user.role}`);
      } else {
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
      }
    }, 800);
  };

  const quickLogin = (userEmail: string) => {
    const user = mockUsers.find(u => u.email === userEmail);
    if (user) {
      setEmail(user.email);
      setPassword(user.password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 flex flex-col">
      {/* Top Bar */}
      <header className="px-6 py-4 flex items-center justify-between">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-semibold text-slate-900 dark:text-white text-sm">Jayshree Foundation</span>
            <p className="text-xs text-slate-500 dark:text-slate-400 -mt-0.5">Volunteer Management System</p>
          </div>
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/')}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
          >
            <Home className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
          >
            {theme === 'dark'
              ? <Sun className="w-4 h-4 text-yellow-400" />
              : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 px-8 py-10 text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl text-white mb-2">Welcome Back</h1>
              <p className="text-blue-100 text-sm">
                Sign in to access your dashboard
              </p>
            </div>

            {/* Form */}
            <div className="px-8 py-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white transition-all"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white transition-all"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Demo Accounts */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-3">
                  Quick access for demo:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => quickLogin('superadmin@jayshreefoundation.org')}
                    className="px-3 py-2 text-xs bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-colors"
                  >
                    Super Admin
                  </button>
                  <button
                    onClick={() => quickLogin('admin@jayshreefoundation.org')}
                    className="px-3 py-2 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    Admin
                  </button>
                  <button
                    onClick={() => quickLogin('member@jayshreefoundation.org')}
                    className="px-3 py-2 text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
                  >
                    Member
                  </button>
                  <button
                    onClick={() => quickLogin('volunteer@jayshreefoundation.org')}
                    className="px-3 py-2 text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                  >
                    Volunteer
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-6 text-xs text-slate-400 dark:text-slate-600 text-center">
            © 2026 Jayshree Foundation · Making a Difference Together
          </p>
        </div>
      </main>
    </div>
  );
}
