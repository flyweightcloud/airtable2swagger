import { Path, TemplateArgs } from ".";

export const template = {
  "delete": {
    "responses": {
      "200": {
        "description": "default",
        "schema": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "id",
            },
            "deleted": {
              "type": "boolean",
              "description": "deleted",
            },
            "error": {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "description": "type",
                },
                "message": {
                  "type": "string",
                  "description": "message",
                },
              },
              "description": "error",
            },
          },
        },
      },
    },
    "summary": "Delete a record",
    "description": "Delete a record in a table. Provide RecordID to select a record.",
    "operationId": "DeleteaRecord",
    "parameters": [
      {
        "name": "RecordID",
        "in": "path",
        "required": true,
        "type": "string",
        "description": "RecordID to be deleted.",
        "x-ms-summary": "RecordID",
        "x-ms-url-encoding": "single",
      },
    ],
  },
};

export default ({operationId}: TemplateArgs): Path => {
  const definition = template;
  if (operationId) {
    definition.delete.operationId = operationId;
  }
  return definition;
};