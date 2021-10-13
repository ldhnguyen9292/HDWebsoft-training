import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const connectHandler = async () => {
  return formatJSONResponse({
    message: `welcome to the websocket!`,
  });
}

export const main = middyfy(connectHandler);
