import { Router } from 'express';

import getJobs from './get-jobs.controller';

const router = Router();
router.get('/', getJobs);

export default router;
