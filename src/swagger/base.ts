export interface Opts {
  title?: string
}

export default (paths: any, opts?: Opts): object => {
  opts = opts || {};
  return ({
    "swagger": "2.0",
    "info": {
      "title": opts.title || "Airtable",
      "description": "Custom Airtable Swagger file created programmatically from https://github.com/flyweightcloud/airtable2swagger",
      "version": "1.0",
      "license": {
        "name": "MIT",
        "url": "https://github.com/flyweightcloud/airtable2swagger/blob/main/LICENSE",
      },
      "contact": {
        "name": "Mark Percival",
        "url": "https://flyweight.cloud",
        "email": "mark@flyweight.cloud",
      },
    },
    "host": "api.airtable.com",
    "basePath": "/v0",
    "schemes": [
      "https",
    ],
    "consumes": [],
    "produces": [],
    "paths": paths,
    "definitions": {},
    "parameters": {},
    "responses": {},
    "securityDefinitions": {
      "API Key": {
        "type": "apiKey",
        "in": "query",
        "name": "api_key",
      },
    },
    "security": [
      {
        "API Key": [],
      },
    ],
    "tags": [],
    "x-ms-connector-metadata": [
      {
        "propertyName": "Website",
        "propertyValue": "https://airtable.com/",
      },
      {
        "propertyName": "Privacy policy",
        "propertyValue": "https://airtable.com/privacy",
      },
      {
        "propertyName": "Categories",
        "propertyValue": "Data",
      },
    ],

  });
};