const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server/config/routes.config.js'];

swaggerAutogen(outputFile, endpointsFiles);