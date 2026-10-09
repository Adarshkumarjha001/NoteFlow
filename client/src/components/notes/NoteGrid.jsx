import NoteCard from './NoteCard';

const NoteGrid = ({ notes, onEdit, onDelete, onTogglePin, onToggleFavorite, onToggleArchive }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          onTogglePin={onTogglePin}
          onToggleFavorite={onToggleFavorite}
          onToggleArchive={onToggleArchive}
        />
      ))}
    </div>
  );
};

export default NoteGrid;
