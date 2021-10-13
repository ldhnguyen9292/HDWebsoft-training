import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
let count = 0

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (_event) => {
  // console.log('Hello world');

  return formatJSONResponse({
    message: `Hello Nguyen, welcome to the exciting Serverless world!`,
    count: count++
  });
}

export const main = middyfy(hello);
