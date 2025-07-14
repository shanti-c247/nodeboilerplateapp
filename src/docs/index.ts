//Constants
import {
  authVariables,
  dataManagementVariables,
  fileHandlerVariables,
  notificationVariables,
  paymentVariables,
  redisVariables,
  ssoVariables,
  twoFAVariables,
  userVariables,
} from '@constants';
//Types
import type { ImportedModule } from '@customTypes';
//Utils
import { commonHandler, swaggerHandler } from '@utils';

const initializeImports = async () => {
  const imports: ImportedModule[] = await Promise.all([
    commonHandler.conditionalImport<ImportedModule>('src/docs/user', '../docs/user/schemas'),
    commonHandler.conditionalImport<ImportedModule>('src/docs/user', '../docs/user/responses'),

    commonHandler.conditionalImport<ImportedModule>('src/docs/auth', '../docs/auth/schemas'),
    commonHandler.conditionalImport<ImportedModule>('src/docs/auth', '../docs/auth/responses'),

    commonHandler.conditionalImport<ImportedModule>('src/docs/localFileHandler', '../docs/localFileHandler/schemas'),
    commonHandler.conditionalImport<ImportedModule>('src/docs/localFileHandler', '../docs/localFileHandler/responses'),

    commonHandler.conditionalImport<ImportedModule>('src/docs/s3FileHandler', '../docs/s3FileHandler/schemas'),
    commonHandler.conditionalImport<ImportedModule>('src/docs/s3FileHandler', '../docs/s3FileHandler/responses'),

    commonHandler.conditionalImport<ImportedModule>('src/docs/sso', '../docs/sso/schemas'),
    commonHandler.conditionalImport<ImportedModule>('src/docs/sso', '../docs/sso/responses'),

    commonHandler.conditionalImport<ImportedModule>('src/docs/dataManagement', '../docs/dataManagement/schemas'),
    commonHandler.conditionalImport<ImportedModule>('src/docs/dataManagement', '../docs/dataManagement/responses'),

    commonHandler.conditionalImport<ImportedModule>('src/docs/payment', '../docs/payment/schemas'),
    commonHandler.conditionalImport<ImportedModule>('src/docs/payment', '../docs/payment/responses'),

    commonHandler.conditionalImport<ImportedModule>('src/docs/notification', '../docs/notification/schemas'),
    commonHandler.conditionalImport<ImportedModule>('src/docs/notification', '../docs/notification/responses'),

    commonHandler.conditionalImport<ImportedModule>('src/docs/twoFA', '../docs/twoFA/schemas'),
    commonHandler.conditionalImport<ImportedModule>('src/docs/twoFA', '../docs/twoFA/responses'),

    commonHandler.conditionalImport<ImportedModule>('src/docs/redis', '../docs/redis/schemas'),
    commonHandler.conditionalImport<ImportedModule>('src/docs/redis', '../docs/redis/responses'),
  ]);

  const [
    userSchemas,
    userResponses,
    authSchemas,
    authResponses,
    localFileHandlerSchemas,
    localFileHandlerResponses,
    s3FileHandlerSchemas,
    s3FileHandlerResponses,
    ssoSchemas,
    ssoResponses,
    dataManagementSchemas,
    dataManagementResponses,
    paymentSchemas,
    paymentResponses,
    notificationSchemas,
    notificationResponses,
    twoFASchemas,
    twoFAResponses,
    redisSchemas,
    redisResponse,
  ]: ImportedModule[] = imports;
  const swaggerOptions = swaggerHandler.createSwaggerConfig({
    routes: [
      userVariables.USER_MODULE_SWAGGER_OPERATIONS_PATH,
      authVariables.AUTH_MODULE_SWAGGER_OPERATIONS_PATH,
      fileHandlerVariables.LOCALFILEHANDLER_MODULE_SWAGGER_OPERATIONS_PATH,
      fileHandlerVariables.S3FILEHANDLER_MODULE_SWAGGER_OPERATIONS_PATH,
      ssoVariables.SSO_MODULE_SWAGGER_OPERATIONS_PATH,
      twoFAVariables.TWOFA_MODULE_SWAGGER_OPERATIONS_PATH,
      dataManagementVariables.DATAMANAGEMENT_MODULE_SWAGGER_OPERATIONS_PATH,
      paymentVariables.PAYMENT_MODULE_SWAGGER_OPERATIONS_PATH,
      notificationVariables.NOTIFICATION_MODULE_SWAGGER_OPERATIONS_PATH,
      redisVariables.REDIS_MODULE_SWAGGER_OPERATIONS_PATH,
    ],
    additionalSchemas: {
      ...userSchemas.default,
      ...authSchemas.default,
      ...localFileHandlerSchemas.default,
      ...s3FileHandlerSchemas.default,
      ...ssoSchemas.default,
      ...twoFASchemas.default,
      ...dataManagementSchemas.default,
      ...paymentSchemas.default,
      ...notificationSchemas.default,
      ...redisSchemas.default,
    },
    additionalResponses: {
      ...userResponses.default,
      ...authResponses.default,
      ...localFileHandlerResponses.default,
      ...s3FileHandlerResponses.default,
      ...ssoResponses.default,
      ...twoFAResponses.default,
      ...dataManagementResponses.default,
      ...paymentResponses.default,
      ...notificationResponses.default,
      ...redisResponse.default,
    },
  });

  return swaggerOptions;
};

export default initializeImports();

export { commonHandler };
