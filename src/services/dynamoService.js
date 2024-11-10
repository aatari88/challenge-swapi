import 'dotenv/config';
import AWS from 'aws-sdk';
const dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION,
    endpoint: process.env.DYNAMODB_ENDPOINT,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const { DATABASE_TABLE } = process.env;

export const saveItem = async (item) => {
  const params = {
    TableName: DATABASE_TABLE,
    Item: item,
  };

  try {
    await dynamoDb.put(params).promise();
    return { message: 'Elemento guardado exitosamente' };
  } catch (error) {
    console.error('Error al guardar el elemento:', error);
    throw new Error('No se pudo guardar el elemento');
  }
};

export const getAllItems = async () => {
  const params = {
    TableName: DATABASE_TABLE,
  };

  try {
    const result = await dynamoDb.scan(params).promise();
    return result.Items;
  } catch (error) {
    console.error('Error al obtener elementos:', error);
    throw new Error('No se pudo obtener la lista de elementos');
  }
};


