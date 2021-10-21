import { Path, TemplateArgs } from ".";

export const template = {
  "get": {
    "responses": {
      "200": {
        "description": "default",
        "schema": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "RecordID",
            },
            "createdTime": {
              "type": "string",
              "description": "Record Created Time",
            },
            "fields": {
              "type": "object",
              "description": "Record Fields",
              "properties": {},
            },
          },
        },
      },
    },
    "parameters": [
      {
        "name": "RecordID",
        "in": "path",
        "required": true,
        "type": "string",
        "description": "RecordID to be retrieved.",
        "x-ms-summary": "RecordID",
        "x-ms-url-encoding": "single",
      },
    ],
    "summary": "Retrieve a record",
    "description": "Retrieve a record in a table. Any empty fields (e.g. [], or false) in the record will not be returned.",
    "operationId": "RetrieveaRecord",
  },
};

export default ({fieldProps, operationId}: TemplateArgs): Path => {
  const definition = template;
  if (fieldProps) {
    definition.get.responses["200"].schema.properties.fields.properties = fieldProps;
  }
  if (operationId) {
    definition.get.operationId = operationId;
  }
  return definition;
};