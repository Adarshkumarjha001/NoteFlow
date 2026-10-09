import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Mail, Lock, Eye, EyeOff, LogIn, NotebookPen } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email');
      return;
    }

    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-purple-800 dark:from-purple-950 dark:via-purple-900 dark:to-gray-900 px-4 py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-purple-400 dark:bg-purple-900 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-pink-400 dark:bg-pink-900 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mb-4 shadow-2xl transform hover:scale-105 transition-transform">
         <NotebookPen className="w-10 h-10 text-white" />
                 </div>
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            Welcome Back
          </h1>
          <p className="text-purple-100 text-lg">
            Sign in to continue your journey
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-purple-200 dark:border-purple-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm animate-shake">
                <p className="font-medium">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-purple-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all placeholder:text-gray-400"
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-purple-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all placeholder:text-gray-400"
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-purple-500 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-purple-500 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
              >
                Create one now →
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-purple-100 drop-shadow">
          © 2026 NoteFlow. Capture your ideas beautifully.
        </p>
      </div>
    </div>
  );
};

export default Login;
