import { Router } from 'express';

import getCurrentAddress from './get-current-address.constoller';
import getNextAddress from './get-next-address.constoller';

const router = Router();
router.get('/current/:id', getCurrentAddress);
router.get('/next/:id', getNextAddress);

export default router;
