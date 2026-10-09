import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { LogOut, Moon, Sun, Menu, X, Plus } from 'lucide-react';

const Navbar = ({ onNewNote, onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-900 dark:to-pink-900 border-b-4 border-purple-800 dark:border-purple-950 sticky top-0 z-30 shadow-xl">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Menu toggle & Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors"
            >
              <Menu className="h-6 w-6 text-white" />
            </button>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-white hidden sm:block drop-shadow-lg">
                NoteFlow
              </h1>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* New Note Button */}
            <button
              onClick={onNewNote}
              className="bg-white hover:bg-purple-50 text-purple-600 font-semibold px-4 py-2 rounded-lg flex items-center space-x-2 text-sm sm:text-base shadow-md hover:shadow-lg transition-all transform hover:scale-105"
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">New Note</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-white" />
              ) : (
                <Moon className="h-5 w-5 text-white" />
              )}
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-3 pl-2 sm:pl-4 border-l border-purple-500 dark:border-purple-700">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-white drop-shadow">
                  {user?.name}
                </p>
                <p className="text-xs text-purple-100">
                  {user?.email}
                </p>
              </div>

              <button
                onClick={logout}
                className="p-2 rounded-lg hover:bg-red-500 text-white transition-colors shadow-md"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
