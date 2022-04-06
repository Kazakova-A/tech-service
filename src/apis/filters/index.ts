import { Router } from 'express';

import getTypes from './get-types.constoller';
import getBrands from './get-brands.controller';
import getZipCodes from './get-zip-codes';

const router = Router();
router.get('/types', getTypes);
router.get('/brands', getBrands);
router.get('/zip', getZipCodes);

export default router;
