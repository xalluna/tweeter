/* eslint-disable */
const { codegen } = require('swagger-axios-codegen');
const fs = require('fs');
require('dotenv').config();

const replacements = [
  {
    original: "import axiosStatic, { type AxiosInstance, type AxiosRequestConfig } from 'axios';",
    new: "import axiosStatic, { type AxiosInstance, type AxiosRequestConfig } from 'axios';\nimport { Env } from '../constants/env';",
  },
  {
    original: "export const basePath = ''",
    new: 'export const basePath = Env.viteApiBaseUrl',
  },
  {
    original: 'export const serviceOptions: ServiceOptions = {};',
    new: 'export const serviceOptions: ServiceOptions = {\n  axios: axiosStatic,\n  loading: true,\n};',
  },
];

// Function to replace tokens in a string
function replaceTokens(content, replacements) {
  replacements.forEach((replacement) => {
    const regex = new RegExp(replacement.original, 'g');
    content = content.replace(regex, replacement.new);
  });

  return content;
}

const outputDir = 'src/api';

async function generateApi() {
  try {
    await codegen({
      remoteUrl: `${process.env.VITE_BASE_API_URL}/swagger/v1/swagger.json`,
      outputDir: outputDir,
      modelMode: 'class',
      strictNullChecks: false,
      multipleFileMode: true,
    });

    const index = `${outputDir}/index.defs.ts`;

    fs.readFile(index, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }

      const modifiedContent = replaceTokens(data, replacements);

      fs.writeFile(index, modifiedContent, 'utf8', (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return;
        }
      });
    });
  } catch (error) {
    console.error('Error generating Axios API client:', error);
  }
}

generateApi();
