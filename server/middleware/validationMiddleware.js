import { body, param, validationResult } from 'express-validator';
import mongoose from 'mongoose';

// Middleware to handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// Validation rules for user registration
export const registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

// Validation rules for user login
export const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
];

// Validation rules for creating a note
export const createNoteValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters'),
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isLength({ max: 10000 }).withMessage('Content cannot exceed 10000 characters'),
  body('category')
    .optional()
    .isIn(['Study', 'Work', 'Personal', 'Ideas', 'Projects'])
    .withMessage('Invalid category'),
  body('tags')
    .optional()
    .isArray().withMessage('Tags must be an array'),
  body('color')
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).withMessage('Invalid color format')
];

// Validation rules for updating a note
export const updateNoteValidation = [
  body('title')
    .optional()
    .trim()
    .notEmpty().withMessage('Title cannot be empty')
    .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters'),
  body('content')
    .optional()
    .trim()
    .notEmpty().withMessage('Content cannot be empty')
    .isLength({ max: 10000 }).withMessage('Content cannot exceed 10000 characters'),
  body('category')
    .optional()
    .isIn(['Study', 'Work', 'Personal', 'Ideas', 'Projects'])
    .withMessage('Invalid category'),
  body('tags')
    .optional()
    .isArray().withMessage('Tags must be an array'),
  body('color')
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).withMessage('Invalid color format')
];

// Validation for MongoDB ObjectId
export const validateObjectId = (paramName = 'id') => [
  param(paramName)
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Invalid ID format')
];
