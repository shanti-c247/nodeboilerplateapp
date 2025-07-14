//Third-party modules
import { Router } from 'express';
//Middlewares
import { authenticate } from '@middlewares';
//Controllers
import { redisController } from '@controllers';

const router = Router();
router.post('/:id', authenticate, redisController.saveDataToRedisCache);
router.get('/:id', authenticate, redisController.getDatafromRedisCache);
router.get('/all', authenticate, redisController.getAllDatafromRedisCache);
router.delete('/:id', authenticate, redisController.deleteDataFromRedisCache);
export default router;
