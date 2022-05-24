import { Router } from "express";
import getJobsList from './get-jobsList.controller';

const router = Router();

router.get('/', getJobsList);

export default router;