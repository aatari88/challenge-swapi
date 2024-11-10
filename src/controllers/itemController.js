import { saveItem, getAllItems } from '../services/dynamoService.js';
import ItemModel from '../models/itemModel.js';
import { formatResponse, errorResponse } from '../utils/response.js';

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Crear un nuevo elemento
 *     description: Crea un nuevo item de Star Wars y lo guarda en DynamoDB.
 *     parameters:
 *       - name: item
 *         in: body
 *         description: El item que se va a crear.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *             height:
 *               type: string
 *             mass:
 *               type: string
 *             hair_color:
 *               type: string
 *             skin_color:
 *               type: string
 *             eye_color:
 *               type: string
 *             birth_year:
 *               type: string
 *             gender:
 *               type: string
 *     responses:
 *       200:
 *         description: Item creado con éxito
 *       500:
 *         description: Error al crear el item
 */
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

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Obtener todos los elementos
 *     description: Obtiene una lista de todos los items almacenados en DynamoDB.
 *     responses:
 *       200:
 *         description: Lista de items obtenida con éxito
 *       500:
 *         description: Error al obtener los items
 */
export const getItems = async () => {
  try {
    const items = await getAllItems();
    return formatResponse(200, items);
  } catch (error) {
    console.error('Error en getItems:', error);
    return errorResponse(500, 'Error al obtener los elementos');
  }
};
