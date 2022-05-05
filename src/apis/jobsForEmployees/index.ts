import { Router } from "express";
import getJobsForEmployees from '../../middlewares/get-jobs-for-employees';

const router = Router();

router.get('/test', getJobsForEmployees);

export default router;