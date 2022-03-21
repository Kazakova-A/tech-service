import { Router } from 'express';

import filterByZip from './by-zip.controller';
import filterBySpecializations from './by-specializations.controller';

const router = Router();
router.get('/zip/:zipcode', filterByZip);
router.get('/specialization/:zipcode', filterBySpecializations);

export default router;
