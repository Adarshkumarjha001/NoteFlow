import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { notesAPI } from '../services/api';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import StatsCard from '../components/stats/StatsCard';
import SearchBar from '../components/common/SearchBar';
import NoteGrid from '../components/notes/NoteGrid';
import NoteEditor from '../components/notes/NoteEditor';
import EmptyState from '../components/common/EmptyState';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import Toast from '../components/common/Toast';
import { FileText, Pin, Heart, Archive, Plus, Search as SearchIcon } from 'lucide-react';

const DashboardPage = () => {
  const location = useLocation();
  
  // State
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);

  // Fetch notes
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const params = getFilterParams();
      const response = await notesAPI.getNotes(params);
      setNotes(response.data.data);
      setFilteredNotes(response.data.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      showToast('Failed to load notes', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [location.pathname]);

  // Filter based on route
  const getFilterParams = () => {
    const path = location.pathname;
    if (path === '/pinned') return { isPinned: true, isArchived: false };
    if (path === '/favorites') return { isFavorite: true, isArchived: false };
    if (path === '/archived') return { isArchived: true };
    if (path.startsWith('/category/')) {
      const category = path.split('/').pop();
      return { 
        category: category.charAt(0).toUpperCase() + category.slice(1),
        isArchived: false 
      };
    }
    return {};
  };

  // Search functionality
  // useEffect(() => {
  //   if (searchQuery.trim()) {
  //     const query = searchQuery.toLowerCase();
  //     const filtered = notes.filter(
  //       (note) =>
  //         note.title.toLowerCase().includes(query) ||
  //         note.content.toLowerCase().includes(query) ||
  //         note.tags.some((tag) => tag.toLowerCase().includes(query))
  //     );
  //     setFilteredNotes(filtered);
  //   } else {
  //     setFilteredNotes(notes);
  //   }
  // }, [searchQuery, notes]);

  

  // Calculate stats
  const stats = {
    total: notes.filter(n => !n.isArchived).length,
    pinned: notes.filter(n => n.isPinned && !n.isArchived).length,
    favorites: notes.filter(n => n.isFavorite && !n.isArchived).length,
    archived: notes.filter(n => n.isArchived).length,
  };

  // Handlers
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleNewNote = () => {
    setEditingNote(null);
    setEditorOpen(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setEditorOpen(true);
  };

  const handleSaveNote = async (noteData) => {
    try {
      setSaving(true);
      if (editingNote?._id) {
        // Update existing note
        await notesAPI.updateNote(editingNote._id, noteData);
        showToast('Note updated successfully');
      } else {
        // Create new note
        await notesAPI.createNote(noteData);
        showToast('Note created successfully');
      }
      setEditorOpen(false);
      setEditingNote(null);
      fetchNotes();
    } catch (error) {
      console.error('Error saving note:', error);
      showToast(error.response?.data?.message || 'Failed to save note', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      await notesAPI.deleteNote(noteId);
      showToast('Note deleted successfully');
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
      showToast('Failed to delete note', 'error');
    }
  };

  const handleTogglePin = async (noteId) => {
    try {
      await notesAPI.togglePin(noteId);
      fetchNotes();
    } catch (error) {
      console.error('Error toggling pin:', error);
      showToast('Failed to update note', 'error');
    }
  };

  const handleToggleFavorite = async (noteId) => {
    try {
      await notesAPI.toggleFavorite(noteId);
      fetchNotes();
    } catch (error) {
      console.error('Error toggling favorite:', error);
      showToast('Failed to update note', 'error');
    }
  };

  const handleToggleArchive = async (noteId) => {
    try {
      await notesAPI.toggleArchive(noteId);
      showToast(location.pathname === '/archived' ? 'Note unarchived' : 'Note archived');
      fetchNotes();
    } catch (error) {
      console.error('Error toggling archive:', error);
      showToast('Failed to update note', 'error');
    }
  };

  // Get page title
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'All Notes';
    if (path === '/pinned') return 'Pinned Notes';
    if (path === '/favorites') return 'Favorite Notes';
    if (path === '/archived') return 'Archived Notes';
    if (path.startsWith('/category/')) {
      const category = path.split('/').pop();
      return `${category.charAt(0).toUpperCase() + category.slice(1)} Notes`;
    }
    return 'Notes';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
      {/* Navbar */}
      <Navbar
        onNewNote={handleNewNote}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-purple-50/50 dark:bg-gray-900/50 min-h-screen">
          {/* Stats */}
          {location.pathname === '/' && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatsCard icon={FileText} label="Total Notes" value={stats.total} color="primary" />
              <StatsCard icon={Pin} label="Pinned" value={stats.pinned} color="purple" />
              <StatsCard icon={Heart} label="Favorites" value={stats.favorites} color="green" />
              <StatsCard icon={Archive} label="Archived" value={stats.archived} color="yellow" />
            </div>
          )}

          {/* Search */}
          <div className="mb-6">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
              placeholder={`Search in ${getPageTitle().toLowerCase()}...`}
            />
          </div>

          {/* Page Title */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {getPageTitle()}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
            </p>
          </div>

          {/* Notes Grid */}
          {loading ? (
            <LoadingSkeleton />
          ) : filteredNotes.length > 0 ? (
            <NoteGrid
              notes={filteredNotes}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
              onTogglePin={handleTogglePin}
              onToggleFavorite={handleToggleFavorite}
              onToggleArchive={handleToggleArchive}
            />
          ) : (
            <EmptyState
              icon={searchQuery ? SearchIcon : FileText}
              title={searchQuery ? 'No notes found' : 'No notes yet'}
              message={
                searchQuery
                  ? `No notes match "${searchQuery}". Try a different search term.`
                  : 'Start capturing your ideas by creating your first note!'
              }
              action={
                !searchQuery && (
                  <button onClick={handleNewNote} className="btn-primary flex items-center space-x-2">
                    <Plus className="h-5 w-5" />
                    <span>Create Your First Note</span>
                  </button>
                )
              }
            />
          )}
        </main>
      </div>

      {/* Note Editor Modal */}
      {editorOpen && (
        <NoteEditor
          note={editingNote}
          onSave={handleSaveNote}
          onClose={() => {
            setEditorOpen(false);
            setEditingNote(null);
          }}
          isLoading={saving}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default DashboardPage;
