import { Router } from 'express';
import {getUser} from '../controllers';
import {send} from '../provider';
const router = Router();
router.get('/', send(getUser,{auth: 'jwtAuth'}));

export default router;
