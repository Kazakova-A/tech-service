import { Router } from 'express';

import getCurrentAddress from './get-current-address.constoller';

const router = Router();
router.get('/current/:id', getCurrentAddress);

export default router;
