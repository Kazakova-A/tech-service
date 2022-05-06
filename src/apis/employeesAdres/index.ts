import { Router } from "express";

import getEmployeesCurrentAdres from './get-employees-current-adres.controller';
import getEmployeesFutureAdres from './get-employees-future-adres.controller';

const router = Router();
router.get('/current', getEmployeesCurrentAdres);
router.get('/future', getEmployeesFutureAdres);

export default router;