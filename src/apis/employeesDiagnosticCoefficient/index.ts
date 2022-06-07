import { Router } from 'express';

import getDiagnosticCoefficient from './get-diagnostic-coefficient.constoller';

const router = Router();
router.get('/:type/:brand/:id', getDiagnosticCoefficient);

export default router;
