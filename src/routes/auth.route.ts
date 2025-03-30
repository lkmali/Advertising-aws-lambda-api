import {  Router } from 'express';
import {send} from '../provider';
import {basicAuth, signUp} from '../controllers';
import {envConfig} from '../config';
const router = Router();

router.post('/login', send(basicAuth,{auth: envConfig.BASIC_STRATEGY_NAME}));
router.post('/signin', send(signUp,{}));

export default router;
