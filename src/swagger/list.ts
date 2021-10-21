import { Path, TemplateArgs } from ".";

export const template = {
  "get": {
    "responses": {
      "200": {
        "description": "default",
        "schema": {
          "type": "object",
          "properties": {
            "records": {
              "type": "array",
              "items": {
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
              "description": "Records",
            },
          },
        },
      },
    },
    "parameters": [
      {
        "name": "filterByFormula",
        "in": "query",
        "required": false,
        "type": "string",
        "x-ms-visibility": "advanced",
        "description": "A formula used to filter records.",
        "x-ms-summary": "Formula filter",
      },
      {
        "name": "maxRecords",
        "in": "query",
        "required": false,
        "type": "integer",
        "x-ms-visibility": "advanced",
        "description": "The maximum total number of records that will be returned in your requests.",
        "x-ms-summary": "Maximum number of records.",
      },
      {
        "name": "pageSize",
        "in": "query",
        "required": false,
        "type": "integer",
        "x-ms-visibility": "advanced",
        "description": "The number of records returned in each request. Must be less than or equal to 100.",
        "x-ms-summary": "Page size per request",
      },
      {
        "name": "view",
        "in": "query",
        "required": false,
        "type": "string",
        "x-ms-visibility": "advanced",
        "description": "The name or ID of a view in the table. If set, only the records in that view will be returned.",
        "x-ms-summary": "View",
      },
      {
        "name": "cellFormat",
        "in": "query",
        "required": false,
        "type": "string",
        "x-ms-visibility": "advanced",
        "description": "The format that should be used for cell values. Supported values are: json: cells will be formatted as JSON, depending on the field type. string: cells will be formatted as user-facing strings, regardless of the field type.",
        "x-ms-summary": "Cell format",
      },
      {
        "name": "timeZone",
        "in": "query",
        "required": false,
        "type": "string",
        "x-ms-visibility": "advanced",
        "description": "The time zone that should be used to format dates when using string as the cellFormat. This parameter is required when using string as the cellFormat.",
        "x-ms-summary": "Time zone",
      },
      {
        "name": "userLocale",
        "in": "query",
        "required": false,
        "type": "string",
        "x-ms-visibility": "advanced",
        "description": "The user locale that should be used to format dates when using string as the cellFormat. This parameter is required when using string as the cellFormat.",
        "x-ms-summary": "User locale",
      },
    ],
    "summary": "List Records",
    "description": "List Records in table. Returned records do not include any fields with empty values. You can filter, sort, and format the results with the parameters.",
    "operationId": "ListRecords",
  },
};

export default ({fieldProps, operationId}: TemplateArgs): Path => {
  const definition = template;
  if (fieldProps) {
    definition.get.responses["200"].schema.properties.records.items.properties.fields.properties = fieldProps;
  }
  if (operationId) {
    definition.get.operationId = operationId;
  }
  return definition;
};