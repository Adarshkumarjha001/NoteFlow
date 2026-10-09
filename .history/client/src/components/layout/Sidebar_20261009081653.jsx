import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Pin, 
  Heart, 
  Archive, 
  BookOpen,
  Briefcase,
  User as UserIcon,
  Lightbulb,
  Folder,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const categories = [
    { name: 'Study', icon: BookOpen, color: 'text-blue-600' },
    { name: 'Work', icon: Briefcase, color: 'text-purple-600' },
    { name: 'Personal', icon: UserIcon, color: 'text-green-600' },
    { name: 'Ideas', icon: Lightbulb, color: 'text-yellow-600' },
    { name: 'Projects', icon: Folder, color: 'text-red-600' },
  ];

  const mainLinks = [
    { to: '/', label: 'All Notes', icon: Home },
    { to: '/pinned', label: 'Pinned', icon: Pin },
    { to: '/favorites', label: 'Favorites', icon: Heart },
    { to: '/archived', label: 'Archived', icon: Archive },
  ];

  const handleLinkClick = () => {
    // Close sidebar on mobile when link is clicked
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-purple-50 to-pink-50 dark:from-gray-800 dark:to-purple-950 border-r-4 border-purple-300 dark:border-purple-900 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Mobile close button */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b-2 border-purple-300 dark:border-purple-800 bg-purple-100 dark:bg-purple-900">
            <h2 className="text-lg font-semibold text-purple-900 dark:text-white">
              Menu
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800"
            >
              <X className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Main Links */}
            <div>
              <h3 className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-3">
                Navigation
              </h3>
              <div className="space-y-1">
                {mainLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/50'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <link.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-purple-600 dark:text-purple-400'}`} />
                        <span className="font-medium">{link.label}</span>
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-3">
                Categories
              </h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <NavLink
                    key={category.name}
                    to={`/category/${category.name.toLowerCase()}`}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all ${
                        isActive
                          ? 'bg-purple-100 dark:bg-purple-900/50 border-l-4 border-purple-500'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30'
                      }`
                    }
                  >
                    <category.icon className={`h-5 w-5 ${category.color}`} />
                    <span>{category.name}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t-2 border-purple-300 dark:border-purple-800 bg-purple-100 dark:bg-purple-900/50">
            <p className="text-xs text-center text-purple-600 dark:text-purple-400">
              © 2026 NoteFlow
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
