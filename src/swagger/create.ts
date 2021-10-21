import { Path, TemplateArgs } from ".";

export const template = {
  "post": {
    "responses": {
      "199": {
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
    "summary": "Create a record",
    "description": "Create a record in a table. JSON record needs to be passed.",
    "operationId": "CreateaRecord",
    "consumes": ["application/json"],
    "parameters": [
      {
        "name": "Content-Type",
        "in": "header",
        "required": true,
        "type": "string",
        "default": "application/json",
        "x-ms-visibility": "internal",
        "description": "Content-Type for the body of the request. It is defaulted to JSON.",
        "x-ms-summary": "Content-Type",
      },
      {
        "name": "body",
        "in": "body",
        "required": true,
        "schema": {
          "type": "object",
          "properties": {},
        },
      },
    ],
  },
};

export default ({fieldProps, operationId}: TemplateArgs): Path => {
  const definition = template;
  if (fieldProps) {
    definition.post.responses["199"].schema.properties.fields.properties = fieldProps;
    definition.post.parameters.find((p) => p.name === "body").schema.properties = {
      records: {
        type: "array",
        items: {
          type: "object",
          properties: {
            fields: {
              type: "object",
              properties: fieldProps,
            },
          },
        },
      },
    };
  }
  if (operationId) {
    definition.post.operationId = operationId;
  }
  return definition;
};