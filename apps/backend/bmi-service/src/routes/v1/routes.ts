import { BMIController } from '@/src/controllers/bmi.controller';
import { Router } from 'express';


const router = Router();
const bmiController = new BMIController();

// GET route to fetch tips by category
router.get('/bmi-tips', async (req, res) => {
  try {
    const category = req.query.category as string;
    const tip = await bmiController.getBMITipByCategory(category);
    if (!tip) {
      return res.status(404).json({ message: "Tip not found" });
    }
    res.status(200).json({ tips: [tip] });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
    }
  }
});

// POST route to create new BMI tips
router.post('/bmi-tips', async (req, res) => {
  try {
    const response = await bmiController.createBMITip(req.body);
    res.status(201).json(response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
    }
  }
});

export default router;
