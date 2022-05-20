import { Router } from "express";
import getEmployeesList from './get-employeesList.controller';

const router = Router();

router.get('/', getEmployeesList);

export default router;