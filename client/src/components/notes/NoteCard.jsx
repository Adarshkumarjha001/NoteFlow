import { Pin, Heart, Archive, Trash2, Edit, MoreVertical } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { formatRelativeTime, truncateText, getCategoryColor } from '../../utils/formatters';

const NoteCard = ({ note, onEdit, onDelete, onTogglePin, onToggleFavorite, onToggleArchive }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (action) => {
    setShowMenu(false);
    action();
  };

  return (
    <div
      className="card p-4 hover:shadow-lg transition-all cursor-pointer group"
      style={{ backgroundColor: note.color }}
      onClick={() => onEdit(note)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate mb-1">
            {note.title}
          </h3>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(note.category)}`}>
              {note.category}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatRelativeTime(note.updatedAt)}
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-1 ml-2">
          {note.isPinned && (
            <Pin className="h-4 w-4 text-primary-600 dark:text-primary-400 fill-current" />
          )}
          {note.isFavorite && (
            <Heart className="h-4 w-4 text-red-600 dark:text-red-400 fill-current" />
          )}
          
          {/* More Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(() => onTogglePin(note._id));
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Pin className="h-4 w-4" />
                  <span>{note.isPinned ? 'Unpin' : 'Pin'}</span>
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(() => onToggleFavorite(note._id));
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Heart className="h-4 w-4" />
                  <span>{note.isFavorite ? 'Remove from favorites' : 'Add to favorites'}</span>
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(() => onToggleArchive(note._id));
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Archive className="h-4 w-4" />
                  <span>{note.isArchived ? 'Unarchive' : 'Archive'}</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(() => onEdit(note));
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>

                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(() => onDelete(note._id));
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-3">
        {truncateText(note.content, 150)}
      </p>

      {/* Tags */}
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {note.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              #{tag}
            </span>
          ))}
          {note.tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400">
              +{note.tags.length - 3} more
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default NoteCard;
