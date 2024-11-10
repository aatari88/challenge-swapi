# Star Wars API con DynamoDB y Swagger

Esta es una API que interactúa con datos de Star Wars almacenados en DynamoDB. La aplicación utiliza Serverless Framework y Swagger para documentar y exponer la API localmente. Esta guía te guiará a través del proceso de instalación y ejecución.

## Requisitos previos

Antes de empezar, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (version 18 o superior)
- [npm](https://www.npmjs.com/) o [Yarn](https://yarnpkg.com/) como gestor de dependencias
- [Serverless Framework](https://www.serverless.com/) - Instálalo globalmente con el siguiente comando:
  ```bash
  npm install -g serverless

### Clona el repositorio
git clone https://github.com/aatari88/challenge-swapi
cd challenge-swapi

### Instala las dependencias del proyecto:
npm install

### Correr dynamoDb en local
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb -port 8000.

### Crear tabla itemTable
aws dynamodb create-table     --table-name itemTable     --attribute-definitions AttributeName=id,AttributeType=S     --key-schema AttributeName=id,KeyType=HASH     --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5     --endpoint-url http://localhost:8000

### Correr servidro en local
sls offline start

## Swagger
Corre: node app.js

Swagger está habilitado para la documentación de la API. Puedes acceder a la documentación interactiva en la siguiente URL:
http://localhost:3000/dev/api-docs

## Despliegue en AWS
Para desplegar la aplicación en AWS usando Serverless Framework, primero configura tus credenciales de AWS y luego ejecuta el siguiente comando:

sls deploy

## Pruebas unitarias
Las pruebas unitarias se han configurado utilizando Jest. Para ejecutarlas, simplemente ejecuta el siguiente comando:

npm test
