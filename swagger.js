import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
        title: 'Star Wars API with DynamoDB',
        version: '1.0.0',
        description: 'API to interact with Star Wars data stored in DynamoDB',
        },
        servers: [
        {
            url: 'http://localhost:3000', // Update this URL based on your deployment environment
        },
        ],
    },
    apis: ['./src/controllers/*.js'], // Specify the path to your controllers where JSDoc comments are added
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app) => {
    app.use('dev/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
