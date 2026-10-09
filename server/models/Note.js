import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters']
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
      maxlength: [10000, 'Content cannot be more than 10000 characters']
    },
    category: {
      type: String,
      enum: ['Study', 'Work', 'Personal', 'Ideas', 'Projects'],
      default: 'Personal'
    },
    tags: {
      type: [String],
      default: []
    },
    color: {
      type: String,
      default: '#ffffff',
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please provide a valid hex color']
    },
    isPinned: {
      type: Boolean,
      default: false
    },
    isFavorite: {
      type: Boolean,
      default: false
    },
    isArchived: {
      type: Boolean,
      default: false
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true // Index for faster queries
    }
  },
  {
    timestamps: true
  }
);

// Compound index for efficient querying
noteSchema.index({ userId: 1, createdAt: -1 });
noteSchema.index({ userId: 1, isPinned: -1 });
noteSchema.index({ userId: 1, isFavorite: -1 });
noteSchema.index({ userId: 1, isArchived: 1 });

// Text index for search functionality
noteSchema.index({ title: 'text', content: 'text', tags: 'text' });

const Note = mongoose.model('Note', noteSchema);

export default Note;
