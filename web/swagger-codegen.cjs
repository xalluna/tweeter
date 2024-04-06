/* eslint-disable */
const { codegen } = require('swagger-axios-codegen');

async function generateApi() {
  try {
    await codegen({
      remoteUrl: 'https://localhost:7192/swagger/v1/swagger.json',
      outputDir: 'src/api',
    });
    console.log('Axios API client generated successfully!');
  } catch (error) {
    console.error('Error generating Axios API client:', error);
  }
}

generateApi();
