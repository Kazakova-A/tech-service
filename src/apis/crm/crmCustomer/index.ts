import { Router } from 'express';

import crmCustomer from './crmCustomer.controller';

const router = Router();
router.post('/', crmCustomer);

export default router;
