import 'source-map-support/register';

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';

import { createLogger } from '../../utils/logger';

import { SessionAccess } from '../datalayer/SessionDBAccess';

// import { parseUserId } from '../../auth/utils';
// import { CreateUserReq } from '../../models/CreateUserReq';

const logger = createLogger('InserSessionDB');

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info(`create request for ${JSON.stringify(event.body)} received!!`);

  //   const token: string = event.headers.Authorization.split(' ')[1];

  //   const userId = await parseUserId(token);

  //   const userdetails: CreateUserReq = JSON.parse(event.body);
  //userId: userId,

  const sessionId = event.headers.sessionId;

  const ItemResponse = await new SessionAccess().getSession(sessionId);

  return {
    statusCode: ItemResponse.status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: ItemResponse.results,
  };
};
