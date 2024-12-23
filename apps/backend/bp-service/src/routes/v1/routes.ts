import { BloodPressureTipController } from '@/src/controllers/bloodPressure.controller';
import express from 'express';

const router = express.Router();

// Instantiate the controller
const controller = new BloodPressureTipController();

// Route to get tips
router.get('/tips', async (_req, res) => {
  try {
    const response = await controller.getTips();
    res.status(200).json(response);
  } catch (error: unknown) { // explicitly declare error as unknown
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

// Route to create a tip
router.post('/tips', async (req, res) => {
  try {
    const response = await controller.createTip(req.body);
    res.status(201).json(response);
  } catch (error: unknown) { // explicitly declare error as unknown
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

export default router;
