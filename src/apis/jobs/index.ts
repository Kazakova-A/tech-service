import { Router } from 'express';

import getSchedule from './get-employees-schedule.controller';
import getJobs from '../../middlewares/get-jobs';

const router = Router();
router.get('/', getJobs, getSchedule);

export default router;
