import express from 'express';

import { index, store, update } from './controllers/OrderController';

const router = express.Router();

router.get('/orders', index);
router.post('/orders', store);
router.patch('/orders/:id/status', update);

export default router;