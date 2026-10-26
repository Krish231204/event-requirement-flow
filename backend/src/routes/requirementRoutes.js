import { Router } from 'express';
import {
  createRequirement,
  getRequirements,
  getRequirementById,
  deleteRequirement,
  getStats,
  seedRequirements,
} from '../controllers/requirementController.js';
import { validateRequirement } from '../middleware/validator.js';

const router = Router();

// Stats overview
router.get('/stats', getStats);

// Seed route for instant demo
router.post('/seed', seedRequirements);

// Core requirement CRUD
router.post('/', validateRequirement, createRequirement);
router.get('/', getRequirements);
router.get('/:id', getRequirementById);
router.delete('/:id', deleteRequirement);

export default router;
