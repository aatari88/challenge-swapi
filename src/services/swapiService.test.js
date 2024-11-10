import axios from 'axios';
import { getResource, searchResource } from '../services/swapiService.js';

jest.mock('axios');

describe('SWAPI Service Tests', () => {

    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        console.error.mockRestore();  // Restore original implementation after tests
    });
  
    describe('getResource', () => {
        it('should fetch a resource by ID successfully', async () => {
        const mockData = { id: '1', name: 'Luke Skywalker', height: '172' };
        axios.get.mockResolvedValue({ data: mockData });

        const result = await getResource('people', 1);

        expect(axios.get).toHaveBeenCalledWith('https://swapi.py4e.com/api/people/1/');
        expect(result).toEqual(mockData);
        });

        it('should throw an error if the request fails', async () => {
        axios.get.mockRejectedValue(new Error('Request failed'));

        await expect(getResource('people', 1)).rejects.toThrow('No se pudo obtener el recurso de SWAPI');
        expect(axios.get).toHaveBeenCalledWith('https://swapi.py4e.com/api/people/1/');
        });
    });

    describe('searchResource', () => {
        it('should search for a resource successfully', async () => {
        const mockResults = [
            { id: '1', name: 'Luke Skywalker' },
            { id: '2', name: 'Leia Organa' }
        ];
        axios.get.mockResolvedValue({ data: { results: mockResults } });

        const result = await searchResource('people', 'Skywalker');

        expect(axios.get).toHaveBeenCalledWith('https://swapi.py4e.com/api/people/', {
            params: { search: 'Skywalker' },
        });
        expect(result).toEqual(mockResults);
        });

        it('should throw an error if the search request fails', async () => {

        axios.get.mockRejectedValue(new Error('Search request failed'));

        await expect(searchResource('people', 'Skywalker')).rejects.toThrow('No se pudo completar la búsqueda en SWAPI');
        expect(axios.get).toHaveBeenCalledWith('https://swapi.py4e.com/api/people/', {
            params: { search: 'Skywalker' },
        });
        });
    });
});
