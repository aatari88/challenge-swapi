import { restore, mock } from 'aws-sdk-mock';
import { saveItem, getAllItems } from './dynamoService';
// const { saveItem, getAllItems } = require('./dynamoService');  

describe('DynamoDB Service', () => {

    afterAll(() => {
        restore('DynamoDB.DocumentClient');  // Restaura la SDK después de cada prueba
    });

    test('saveItem - deberia guardar un item en DynamoDB', async () => {
        // Mock de la función put de DynamoDB
        mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
            callback(null, 'success');
        });

        const item = { id: '1', nombre: 'Luke', altura: '172' };  // Un ítem de ejemplo

        // Ejecutar la función saveItem
        const result = await saveItem(item);

        expect(result.message).toBe('Elemento guardado exitosamente');  // Verificar el mensaje de éxito
    });

    test('getAllItems - deberia devolver una lista de items', async () => {
        // Mock de la función scan de DynamoDB
        mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
            callback(null, { Items: [{ id: '1', nombre: 'Luke', altura: '172' }] });
        });

        const result = await getAllItems();

        expect(result).toEqual([{ id: '1', nombre: 'Luke', altura: '172' }]);  // Verificar que la lista de items es correcta
    });

    test('getAllItems - deberia manejar errores correctamente', async () => {
        // Mock de la función scan con error
        mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
            callback(new Error('Error en DynamoDB'), null);
        });

        try {
            await getAllItems();
        } catch (error) {
            expect(error.message).toBe('No se pudo obtener la lista de elementos');
        }
    });

});
