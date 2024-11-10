import ItemModel from '../models/itemModel.js';
import { getResource, searchResource } from '../services/swapiService.js';

/**
 * @swagger
 * /api/personajes/{id}:
 *   get:
 *     summary: Retrieve a specific character by ID
 *     description: Retrieve a Star Wars character by their ID and return the data.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The character's ID
 *     responses:
 *       200:
 *         description: A character object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Character ID
 *                 nombre:
 *                   type: string
 *                   description: Character name
 *                 altura:
 *                   type: string
 *                   description: Character height
 *                 masa:
 *                   type: string
 *                   description: Character mass
 *                 color_pelo:
 *                   type: string
 *                   description: Character hair color
 *                 color_piel:
 *                   type: string
 *                   description: Character skin color
 *                 color_ojos:
 *                   type: string
 *                   description: Character eye color
 *                 nacimiento:
 *                  type: string
 *                  description: Character birth year
 *       500:
 *         description: Server error
 */
// Obtener un personaje específico por ID
export const getPeople = async (req) => {
    try {
        const { id } = req.params;
        const personaje = await getResource('people', id);
        const personajeEnEspanol = ItemModel.traducirObjeto(personaje).toObject();
        return { status: 200, data: personajeEnEspanol };
    } catch (error) {
        return { status: 500, data: { message: error.message } };
    }
};
  
/**
 * @swagger
 * /people:
 *   get:
 *     summary: Search for characters by name
 *     description: Search for Star Wars characters by name, returning a list of characters.
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: The name to search for
 *     responses:
 *       200:
 *         description: A list of characters matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Character ID
 *                   nombre:
 *                     type: string
 *                     description: Character name
 *                   altura:
 *                     type: string
 *                     description: Character height
 *                   masa:
 *                     type: string
 *                     description: Character mass
 *                   color_pelo:
 *                     type: string
 *                     description: Character hair color
 *                   color_piel:
 *                     type: string
 *                     description: Character skin color
 *                   color_ojos:
 *                     type: string
 *                     description: Character eye color
 *                   nacimiento:
 *                     type: string
 *                     description: Character birth year
 *       500:
 *         description: Server error
 */
// Buscar personajes por nombre
export const searchPeople = async (req) => {
    try {
        const { nombre } = req.query;
        const personajes = await searchResource('people', nombre);
        const personajesEnEspanol = personajes.map(personaje => ItemModel.traducirObjeto(personaje).toObject());
        return { status: 200, data: personajesEnEspanol };
    } catch (error) {
        return { status: 500, data: { message: error.message } };
    }
};
