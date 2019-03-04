import { APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { logger } from './logger';

/**
 * Read the required environment variable with name envName
 * @param envName name of the environment variable to read
 */
export function readEvnVar(envName: string): string {
  const envValue: string | undefined = process.env[envName];
  if (envValue) {
    logger.info(
      `'${envName}' was configured with '${envValue}' from environment.`
    );
    return envValue;
  } else {
    const reason = `Missing required ${envName} environment variable.`;
    logger.info(reason);
    throw new Error(reason);
  }
}

/**
 * Read the optional environment variable with name envName and defaultValue if not exists
 */
export function readOptionalEvnVar(
  envName: string,
  defaultValue: string
): string {
  const envValue: string | undefined = process.env[envName];
  if (envValue) {
    logger.info(
      `'${envName}' was configured with '${envValue}' from environment.`
    );
    return envValue;
  } else {
    logger.info(
      `'${envName}' was configured with '${envValue}' from environment.`
    );
    return defaultValue;
  }
}

/**
 * Configures AWS X-Ray
 */
export function configureXray() {
  if (readEvnVar('AWS_XRAY_ENABLED') === 'true') {
    logger.info('AWS XRay tracing enabled...');
    const AWSXRay = require('aws-xray-sdk');
    AWSXRay.captureHTTPsGlobal(require('https'));
    // this could be slow! You have to check the performance of the function!
    AWSXRay.captureAWS(require('aws-sdk'));
  }
}

/**
 * Helper function to create http response
 * @param statusCode HTTP status code to return
 * @param body The body of response as string
 */
export function createResponse(
  statusCode: number,
  body: string
): APIGatewayProxyResult {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body,
  };
}

/**
 * Helper function to create http response
 * @param statusCode HTTP status code to return
 * @param status Status value to return in response body
 */
export function createResponseWithStatus(
  statusCode: number,
  status: any
): APIGatewayProxyResult {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({ status }),
  };
}

/**
 * Reads the param value from AWS Parameter Store.
 * @param paramName Name of encrypted parameter
 */
export async function readSsmParam(paramName: string): Promise<string> {
  const ssm = new AWS.SSM({ region: 'eu-central-1' });

  let paramValue;
  try {
    paramValue = await ssm
      .getParameter({ Name: paramName, WithDecryption: true })
      .promise();
  } catch (error) {
    logger.info(`ssm.getParameter('${paramName}') faild with error: ${error}`);
  }

  if (
    paramValue === undefined ||
    paramValue.Parameter === undefined ||
    paramValue.Parameter.Value === undefined
  ) {
    logger.error(
      `Parameter could not be read from SSM Parameter Store: '${paramName}'`
    );
    throw new Error('Could not read from Parameter store');
  }

  logger.info(
    `Parameter successfully read from SSM Parameter Store: '${paramName}'`
  );

  return paramValue.Parameter.Value;
}
