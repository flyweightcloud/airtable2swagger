import { Path, TemplateArgs } from ".";

export const template = {
    "patch": {
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
      "summary": "Update a record",
      "description": "Update a record in a table. It will only update the fields provided and leave the rest as they were.",
      "operationId": "UpdateaRecord",
      "consumes": ["application/json"],
      "parameters": [
        {
          "name": "Content-Type",
          "in": "header",
          "required": false,
          "type": "string",
          "description": "Content-Type for the body of the request. It is defaulted to JSON.",
          "x-ms-summary": "Content-Type",
          "x-ms-url-encoding": "single",
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
    definition.patch.responses["200"].schema.properties.fields.properties = fieldProps;
    definition.patch.parameters.find((p) => p.name === "body").schema.properties = {
      records: {
        type: "array",
        items: {
          type: "object",
          required: ["id"],
          properties: {
            id: {
              type: "string",
            },
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
    definition.patch.operationId = operationId;
  }
  return definition;
};