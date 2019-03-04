import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import {
  configureXray,
  createResponse,
  createResponseWithStatus,
} from './common/common';
import { logger } from './common/logger';

logger.info('Initializing function...');
configureXray();

/**
 *  Async version of Lambda Handler
 */
export const indexHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  if (event === undefined) {
    logger.error('Incoming event Object must not be undefined!');
    return createResponseWithStatus(
      400,
      'Incoming event Object must not be undefined!'
    );
  }

  try {
    return createResponse(200, 'Hello World');
  } catch (error) {
    logger.error(error, 'Failed with error');
    return createResponseWithStatus(500, 'Internal Server Error');
  }
};
