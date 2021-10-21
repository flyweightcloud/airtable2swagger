export interface AirtableRecord {
  id: string
  createdTime: string
  fields: {
    [key: string]: any
  }
}
