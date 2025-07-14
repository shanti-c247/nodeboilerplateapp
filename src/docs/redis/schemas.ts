import { redisHandler } from '@utils';

const redisSchemas = {
  SaveDataRequest: {
    properties: redisHandler.redisRandomData('redisCache'),
  },

  // create plan
  GetDataRequest: {
    type: 'object',
    properties: redisHandler.redisRandomData('redisCache'),
  },

  // update plan Request
  deleteDataRequest: {
    properties: redisHandler.redisRandomData('redisCache'),
  },
};

export default redisSchemas;
