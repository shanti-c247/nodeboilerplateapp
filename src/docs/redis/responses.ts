// constants
import { redisMessages } from '@constants';

// utils
import { swaggerHandler } from '@utils';

const redisResponses = {
  SaveData: swaggerHandler.createSuccessResponse(redisMessages.REDIS_SAVE, {
    $ref: '#/components/schemas/Redis',
  }),

  GetData: swaggerHandler.createSuccessResponse(redisMessages.REDIS_GET, {
    $ref: '#/components/schemas/Redis',
  }),

  DeleteData: swaggerHandler.createSuccessResponse(redisMessages.REDIS_DELETE, {
    $ref: '#/components/schemas/Redis',
  }),
};

export default redisResponses;
