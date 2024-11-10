import ItemModel from '../models/itemModel.js';
import { getResource, searchResource } from '../services/swapiService.js';

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
