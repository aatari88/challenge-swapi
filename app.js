import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Star Wars API',
      version: '1.0.0',
      description: 'API to interact with Star Wars data stored in DynamoDB',
    },
    servers: [
      {
        url: 'http://localhost:3000',  // Cambia esto si es necesario
      },
    ],
  },
  apis: ['./src/controllers/*.js'], // Ruta a tus controladores (ajusta según tu proyecto)
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const app = express();

// Servir la documentación de Swagger en /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas adicionales de tu API
app.get('/api/items', (req, res) => {
  res.json({ message: 'Items list' });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
