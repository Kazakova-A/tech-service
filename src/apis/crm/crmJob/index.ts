import { Router } from 'express';

import crmJob from './crmJob.controller';

const router = Router();
router.post('/', crmJob);

export default router;
