import * as dynamoService from '../services/dynamoService.js';
import * as itemController from '../controllers/itemController.js';
import { formatResponse, errorResponse } from '../utils/response.js';

jest.mock('../services/dynamoService.js');
jest.mock('../utils/response.js');

describe('Item Controller Tests', () => {
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        console.error.mockRestore(); 
    });
  
    describe('createItem', () => {
        it('deberia crear un elemento y devolver una respuesta de exito.', async () => {
        const mockItem = { id: '1', nombre: 'Luke', altura: '172', masa: '77' };
        dynamoService.saveItem.mockResolvedValue({ message: 'Elemento guardado exitosamente' });
        formatResponse.mockReturnValue({ statusCode: 200, body: JSON.stringify({ message: 'Elemento creado con éxito', item: mockItem }) });

        const event = {
            body: JSON.stringify({
            id: '1',
            name: 'Luke',
            height: '172',
            mass: '77'
            }),
        };

        const result = await itemController.createItem(event);

        expect(dynamoService.saveItem).toHaveBeenCalledWith(expect.objectContaining(mockItem));
        expect(result).toEqual({ statusCode: 200, body: JSON.stringify({ message: 'Elemento creado con éxito', item: mockItem }) });
        });

        it('deberia retornar un mensaje si saveItem falla', async () => {
        dynamoService.saveItem.mockRejectedValue(new Error('Save failed'));
        errorResponse.mockReturnValue({ statusCode: 500, body: JSON.stringify({ error: 'Error al crear el elemento' }) });

        const event = {
            body: JSON.stringify({
            id: '1',
            name: 'Luke',
            height: '172',
            mass: '77'
            }),
        };

        const result = await itemController.createItem(event);

        expect(dynamoService.saveItem).toHaveBeenCalled();
        expect(result).toEqual({ statusCode: 500, body: JSON.stringify({ error: 'Error al crear el elemento' }) });
        });
    });

    describe('getItems', () => {
        it('deberia devolver una lista de elementos con una respuesta exitosa', async () => {
        const mockItems = [{ id: '1', nombre: 'Luke', altura: '172', masa: '77' }];
        dynamoService.getAllItems.mockResolvedValue(mockItems);
        formatResponse.mockReturnValue({ statusCode: 200, body: JSON.stringify(mockItems) });

        const result = await itemController.getItems();

        expect(dynamoService.getAllItems).toHaveBeenCalled();
        expect(result).toEqual({ statusCode: 200, body: JSON.stringify(mockItems) });
        });

        it('deberia devolver una respuesta de error si getAllItems falla', async () => {
        dynamoService.getAllItems.mockRejectedValue(new Error('Fetch failed'));
        errorResponse.mockReturnValue({ statusCode: 500, body: JSON.stringify({ error: 'Error al obtener los elementos' }) });

        const result = await itemController.getItems();

        expect(dynamoService.getAllItems).toHaveBeenCalled();
        expect(result).toEqual({ statusCode: 500, body: JSON.stringify({ error: 'Error al obtener los elementos' }) });
        });
    });
});
