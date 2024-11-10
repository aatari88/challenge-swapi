import { getResource, searchResource } from '../services/swapiService.js';
import { getPeople, searchPeople } from './swapiController.js';

import ItemModel from '../models/itemModel.js';

jest.mock('../services/swapiService.js');
jest.mock('../models/itemModel.js');

describe('Item Controller Tests', () => {

    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });
    
    afterAll(() => {
        console.error.mockRestore(); 
    });
  
    describe('getPeople', () => {
        it('debe devolver un caracter traducido por ID', async () => {
        const mockCharacter = { id: '1', name: 'Luke Skywalker', height: '172' };
        const translatedCharacter = { id: '1', nombre: 'Luke Skywalker', altura: '172' };
        
        getResource.mockResolvedValue(mockCharacter);
        ItemModel.traducirObjeto.mockReturnValue({
            toObject: () => translatedCharacter
        });

        const req = { params: { id: '1' } };
        const response = await getPeople(req);

        expect(getResource).toHaveBeenCalledWith('people', '1');
        expect(ItemModel.traducirObjeto).toHaveBeenCalledWith(mockCharacter);
        expect(response).toEqual({ status: 200, data: translatedCharacter });
        });

        it('deberia manejar errores y devolver un status 500', async () => {
        getResource.mockRejectedValue(new Error('Request failed'));

        const req = { params: { id: '1' } };
        const response = await getPeople(req);

        expect(response).toEqual({
            status: 500,
            data: { message: 'Request failed' }
        });
        });
    });

    describe('searchPeople', () => {
        it('deberia devolver una lista de personajes segun la consulta de busqueda.', async () => {
        const mockCharacters = [
            { id: '1', name: 'Luke Skywalker' },
            { id: '2', name: 'Leia Organa' }
        ];
        const translatedCharacters = [
            { id: '1', nombre: 'Luke Skywalker' },
            { id: '2', nombre: 'Leia Organa' }
        ];

        searchResource.mockResolvedValue(mockCharacters);
        ItemModel.traducirObjeto
            .mockImplementation((character) => ({
            toObject: () => translatedCharacters.find(tc => tc.id === character.id)
            }));

        const req = { query: { nombre: 'Skywalker' } };
        const response = await searchPeople(req);

        expect(searchResource).toHaveBeenCalledWith('people', 'Skywalker');
        expect(response).toEqual({ status: 200, data: translatedCharacters });
        });

        it('debe manejar errores y devolver un status 500 para la busqueda', async () => {
        searchResource.mockRejectedValue(new Error('Search failed'));

        const req = { query: { nombre: 'Skywalker' } };
        const response = await searchPeople(req);

        expect(response).toEqual({
            status: 500,
            data: { message: 'Search failed' }
        });
        });
    });
});
