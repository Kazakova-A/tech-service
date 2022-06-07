import { Router } from 'express';

import crmCustomerAndAddress from './crmCustomer.controller';

const router = Router();
router.post('/', crmCustomerAndAddress);

export default router;
