import axios from 'axios';

const SWAPI_BASE_URL = 'https://swapi.py4e.com/api';

// Función para obtener un recurso de SWAPI por ID
export const getResource = async (resourceType, id) => {
    try {
        const response = await axios.get(`${SWAPI_BASE_URL}/${resourceType}/${id}/`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el recurso de SWAPI: ${error}`);
        throw new Error('No se pudo obtener el recurso de SWAPI');
    }
};

// Función para buscar con un término de búsqueda
export const searchResource = async (resourceType, query) => {
    try {
        const response = await axios.get(`${SWAPI_BASE_URL}/${resourceType}/`, {
        params: { search: query },
        });
        return response.data.results;
    } catch (error) {
        console.error(`Error al buscar en SWAPI: ${error}`);
        throw new Error('No se pudo completar la búsqueda en SWAPI');
    }
};
