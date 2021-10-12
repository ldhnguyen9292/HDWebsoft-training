import { formatJSONResponse } from './../../libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { connect, connection } from 'mongoose'

const uri = 'your mongo uri'
const client = connect(uri, { serverSelectionTimeoutMS: 5000 })

const connectMongo = async (_event, context) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    await client;
    return formatJSONResponse({ message: `Mongo status: ${connection.readyState}` })
  } catch (error) {
    return formatJSONResponse({ message: error });
  }
}

export const main = middyfy(connectMongo);
