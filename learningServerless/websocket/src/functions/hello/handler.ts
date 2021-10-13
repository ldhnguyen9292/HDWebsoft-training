import { ApiGatewayManagementApi } from 'aws';
import { formatJSONResponse } from '@libs/apiGateway';
import { format } from 'util'
import { middyfy } from '@libs/lambda';

const sendMessageToClient = (url, connectionId, payload) =>
  new Promise((resolve, reject) => {
    const apigatewaymanagementapi = new ApiGatewayManagementApi({
      apiVersion: '2018-11-29',
      endpoint: url,
    });
    apigatewaymanagementapi.postToConnection(
      {
        ConnectionId: connectionId, // connectionId of the receiving ws-client
        Data: JSON.stringify(payload),
      },
      (err, data) => {
        if (err) {
          console.log('err is', err);
          reject(err);
        }
        resolve(data);
      }
    );
  });

export const defaultHandler = async (event, _context) => {
  const domain = event.requestContext.domainName;
  const stage = event.requestContext.stage;
  const connectionId = event.requestContext.connectionId;
  const callbackUrlForAWS = format(format('https://%s/%s', domain, stage)); //construct the needed url
  await sendMessageToClient(callbackUrlForAWS, connectionId, event);

  return formatJSONResponse({
    statusCode: 200,
  });
};
export const main = middyfy(defaultHandler)