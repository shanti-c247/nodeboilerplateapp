//Third-party modules
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

//Config
import swaggerOptionsPromise from '@docs';

//Constants
import { commonVariables } from '@constants';

const swaggerRoute = express.Router();

swaggerOptionsPromise.then((swaggerOptions) => {
  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  swaggerRoute.use('/', serve, setup(swaggerDocs, commonVariables.SWAGGER_UI_OPTIONS));
});

export default swaggerRoute;
