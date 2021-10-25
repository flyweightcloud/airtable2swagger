import * as swaggerBuilder from "./swagger";
export interface AirtableRecord {
  id: string
  createdTime: string
  fields: {
    [key: string]: any,
  }
}

export const swagger = swaggerBuilder;
