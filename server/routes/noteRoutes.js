import express from 'express';
import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  togglePin,
  toggleFavorite,
  toggleArchive
} from '../controllers/noteController.js';
import { protect } from '../middleware/authMiddleware.js';
import {
  createNoteValidation,
  updateNoteValidation,
  validateObjectId,
  handleValidationErrors
} from '../middleware/validationMiddleware.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Main CRUD routes
router.route('/')
  .get(getNotes)
  .post(createNoteValidation, handleValidationErrors, createNote);

router.route('/:id')
  .get(validateObjectId('id'), handleValidationErrors, getNote)
  .put(validateObjectId('id'), updateNoteValidation, handleValidationErrors, updateNote)
  .delete(validateObjectId('id'), handleValidationErrors, deleteNote);

// Toggle routes
router.patch('/:id/pin', validateObjectId('id'), handleValidationErrors, togglePin);
router.patch('/:id/favorite', validateObjectId('id'), handleValidationErrors, toggleFavorite);
router.patch('/:id/archive', validateObjectId('id'), handleValidationErrors, toggleArchive);

export default router;
