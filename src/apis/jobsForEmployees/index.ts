import { Router } from "express";
import getJobsForEmployees from './get-jobs-for-employees.controller';

const router = Router();

router.get('/', getJobsForEmployees);

export default router;