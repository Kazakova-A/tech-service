import { Router } from 'express';

import getSchedule from './get-employees-schedule.controller';
import getJobs from '../../middlewares/get-jobs';
import getEmployessByFilters from '../../middlewares/get-employess-by-filters';
import addJobs from './add-jobs.controller';

const router = Router();
router.get('/', getEmployessByFilters, getJobs, getSchedule );
router.post('/', addJobs);

export default router;
