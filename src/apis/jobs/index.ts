import { Router } from 'express';

import getSchedule from './get-employees-schedule.controller';
import getJobs from '../../middlewares/get-jobs';
import getEmployessByFilters from '../../middlewares/get-employess-by-filters';

const router = Router();
router.get('/', getEmployessByFilters, getJobs, getSchedule);

export default router;
