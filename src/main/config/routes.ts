import { Router } from 'express';
import { userRouter } from '@/modules/users/infra/routes/user-routes';
import { sessionRouter } from '@/modules/sessions/infra/routes/session-routes';
import { addressesRouter } from '@/modules/addresses/infra/routes/address-routes';
import { healthCheckRouter } from '@/modules/health-check/infra/routes/health-check-router';
import { verificationTokenRouter } from '@/modules/verification-tokens/infra/routes/verification-token-routes';

export const router = Router();

router.use(healthCheckRouter);
router.use(userRouter);
router.use(sessionRouter);
router.use(addressesRouter);
router.use(verificationTokenRouter);
