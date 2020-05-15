import { Router } from 'express';


const router = Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Profile works!' });
});

export default router;