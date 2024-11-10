import { saveItem, getAllItems } from '../services/dynamoService.js';
import ItemModel from '../models/itemModel.js';
import { formatResponse, errorResponse } from '../utils/response.js';

export const createItem = async (event) => {
  try {
    const data = JSON.parse(event.body);
    
    const item = new ItemModel({
      id: data.id,
      name: data.name,
      height: data.height,
      mass: data.mass,
      hair_color: data.hair_color,
      skin_color: data.skin_color,
      eye_color: data.eye_color,
      birth_year: data.birth_year,
      gender: data.gender,
    });

    await saveItem(item);
    return formatResponse(200, { message: 'Elemento creado con éxito', item });
  } catch (error) {
    console.error('Error en crearElemento:', error);
    return errorResponse(500, 'Error al crear el elemento');
  }
};

export const getItems = async () => {
  try {
    const items = await getAllItems();
    return formatResponse(200, items);
  } catch (error) {
    console.error('Error en getItems:', error);
    return errorResponse(500, 'Error al obtener los elementos');
  }
};
