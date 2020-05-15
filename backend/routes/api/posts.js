import { Router } from 'express';


const router = Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Posts works!' });
});

export default router;