import base from "./base";
import list from "./list";
import create from "./create";
import get from "./get";
import patch from "./patch";
import del from "./delete";
import { AirtableRecord } from "..";

export interface Field {
  name: string
  type: string
  format?: string
}

export interface FieldProperties {
  [name: string]: {
    type: string
    format?: string,
  }
}


export interface Path {
  [path: string]: {
    [action: string]: any,
  }
}

export interface TemplateArgs {
  fieldProps?: FieldProperties
  operationId?: string
}

const determineType = (value: any): {type: string, format?: string} => {
  const type = typeof value;
  if (type === "boolean") {
    return {type};
  } else if (type === "number") {
    const str = value.toString();
    if (str.indexOf(".") >= 0) {
      // float or double in openapi
      return {type};
    }
    return { type: "integer" };
  } else if (type === "string") {
    if (value.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/) !== null) {
      return { type: "string", format: "date" };
    } else if (value.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z$/) !== null) {
      return { type: "string", format: "date-time" };
    }
  }
  return {type: "string"};
};

export const extractFieldsFromRecord = (record: AirtableRecord): Field[] => {
  const fieldList: Field[] = [];
  Object.entries(record.fields).forEach(([name, value]) => {
    const {type, format} = determineType(value);
    if (format) {
      fieldList.push({ name, type, format });
    } else {
      fieldList.push({ name, type});
    }
  });
  return fieldList;
};

export const extractFieldsFromRecords = (records: AirtableRecord[]): FieldProperties=> {
  const fieldProps: FieldProperties = {};
  for (const record of records) {
    const fields = extractFieldsFromRecord(record);
    for (const field of fields) {
      if (!fieldProps[field.name]) {
        if (field.format) {
          fieldProps[field.name] = { type: field.type, format: field.format };
        } else {
          fieldProps[field.name] = { type: field.type};
        }
      }
    }
  }
  return fieldProps;
};

// Builds the paths and attaches them to the passed in object
// This lets you build multiple tables paths
export const buildPaths = (paths: Path, basePath: string, fieldProps: FieldProperties, tableName?: string): Path => {
  const baseActions = paths[basePath] = {};
  const recordActions = paths[basePath+"/{RecordID}"] = {};
  if (!tableName) {
    tableName = basePath.split("/").slice(-1)[0];
  }

  Object.assign(baseActions, list({fieldProps, operationId: `List${tableName}`})
    , create({fieldProps, operationId: `Create${tableName}`})
    , patch({fieldProps, operationId: `Update${tableName}`}));
  Object.assign(recordActions, get({fieldProps, operationId: `Get${tableName}`})
    , del({operationId: `Delete${tableName}`}));
  return paths;
};

// Assumes you're passing in a path object
export const generateSwagger = (paths: Path) => {
  return base(paths);
};
