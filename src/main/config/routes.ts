import { Router } from 'express';
import { healthCheckRouter } from '@/modules/health-check/infra/routes/health-check-router';
import { sessionRouter } from '@/modules/session/infra/routes/session-router';

export const router = Router();

router.use(healthCheckRouter);
router.use(sessionRouter);
