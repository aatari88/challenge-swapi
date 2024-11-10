import { createItem, getItems } from './controllers/itemController.js';
import { getPeople, searchPeople } from './controllers/swapiController.js';

export const createItemHandler = async (event) => {
  return createItem(event);
}

export const getItemsHandler = async () => {
  return getItems();
}

export const obtenerPersonajeHandler = async (event) => {
  const { id } = event.pathParameters;
  const response = await getPeople({ params: { id } });
  return {
    statusCode: response.status,
    body: JSON.stringify(response.data),
  };
};

export const buscarPersonajesHandler = async (event) => {
  const { nombre } = event.queryStringParameters || {};
  const response = await searchPeople({ query: { nombre } });
  return {
    statusCode: response.status,
    body: JSON.stringify(response.data),
  };
};