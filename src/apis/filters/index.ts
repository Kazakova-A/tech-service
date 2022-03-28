import { Router } from 'express';

import filterByZip from './by-zip.controller';
import filterBySpecializations from './by-specializations.controller';
import getTypes from './get-types.constoller';
import getBrands from './get-brands.controller';

const router = Router();
router.get('/zip/:zipcode', filterByZip);
router.get('/specialization/:zipcode', filterBySpecializations);
router.get('/types', getTypes);
router.get('/brands', getBrands);

export default router;
