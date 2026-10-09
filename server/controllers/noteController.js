import Note from '../models/Note.js';
import mongoose from 'mongoose';

// @desc    Get all notes for logged in user
// @route   GET /api/notes
// @access  Private
export const getNotes = async (req, res) => {
  try {
    const { search, category, isPinned, isFavorite, isArchived } = req.query;
    
    // Build query
    let query = { userId: req.user.id };

    // Apply filters
    if (category) {
      query.category = category;
    }
    if (isPinned !== undefined) {
      query.isPinned = isPinned === 'true';
    }
    if (isFavorite !== undefined) {
      query.isFavorite = isFavorite === 'true';
    }
    if (isArchived !== undefined) {
      query.isArchived = isArchived === 'true';
    }

    // Apply search
    if (search) {
      query.$text = { $search: search };
    }

    // Execute query with sorting (pinned first, then by creation date)
    const notes = await Note.find(query)
      .sort({ isPinned: -1, createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching notes',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get single note
// @route   GET /api/notes/:id
// @access  Private
export const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    // Check if note belongs to user
    if (note.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this note'
      });
    }

    res.status(200).json({
      success: true,
      data: note
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching note',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Create new note
// @route   POST /api/notes
// @access  Private
export const createNote = async (req, res) => {
  try {
    const { title, content, category, tags, color } = req.body;

    const note = await Note.create({
      title,
      content,
      category,
      tags,
      color,
      userId: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: note
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating note',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update note
// @route   PUT /api/notes/:id
// @access  Private
export const updateNote = async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    // Check if note belongs to user
    if (note.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this note'
      });
    }

    // Update note
    note = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Note updated successfully',
      data: note
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating note',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    // Check if note belongs to user
    if (note.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this note'
      });
    }

    await note.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting note',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Toggle pin status
// @route   PATCH /api/notes/:id/pin
// @access  Private
export const togglePin = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    // Check if note belongs to user
    if (note.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this note'
      });
    }

    note.isPinned = !note.isPinned;
    await note.save();

    res.status(200).json({
      success: true,
      message: `Note ${note.isPinned ? 'pinned' : 'unpinned'} successfully`,
      data: note
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling pin status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Toggle favorite status
// @route   PATCH /api/notes/:id/favorite
// @access  Private
export const toggleFavorite = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    // Check if note belongs to user
    if (note.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this note'
      });
    }

    note.isFavorite = !note.isFavorite;
    await note.save();

    res.status(200).json({
      success: true,
      message: `Note ${note.isFavorite ? 'added to favorites' : 'removed from favorites'}`,
      data: note
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling favorite status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Toggle archive status
// @route   PATCH /api/notes/:id/archive
// @access  Private
export const toggleArchive = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    // Check if note belongs to user
    if (note.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this note'
      });
    }

    note.isArchived = !note.isArchived;
    await note.save();

    res.status(200).json({
      success: true,
      message: `Note ${note.isArchived ? 'archived' : 'unarchived'} successfully`,
      data: note
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling archive status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
