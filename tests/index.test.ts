import * as fs from "fs";
import { buildPaths, extractFieldsFromRecord, extractFieldsFromRecords, Field, generateSwagger } from "../src/swagger";
import base from "../src/swagger/base";
import * as airtableRecords from "./fixtures/airtable_inbound.json";

const getField = (fields: Field[], name: string): Field | undefined =>{
  return fields.find((field) => field.name === name);
};

describe("Field extraction/typing", () => {
    test("that it correctly extracts and types a record", async () => {
        const swaggerFields = extractFieldsFromRecord(airtableRecords.records[0]);
        expect(getField(swaggerFields, "Checkboxy").type).toEqual("boolean");
        expect(getField(swaggerFields, "Monet").type).toEqual("integer");
        expect(getField(swaggerFields, "Decimal").type).toEqual("number");
    });
    test("that it correctly extracts unique fields from all record", async () => {
        const swaggerFields = extractFieldsFromRecords(airtableRecords.records);
        expect(swaggerFields.Name.type).toEqual("string");
        expect(swaggerFields.Notes.type).toEqual("string");
        expect(swaggerFields.Email.type).toEqual("string");
        expect(swaggerFields.CreatedOn.type).toEqual("string");
        expect(swaggerFields.CreatedOn.format).toEqual("date");
        expect(swaggerFields.CreatedAt.format).toEqual("date-time");
    });
});

describe("Swagger building", () => {
    test("builds a set of paths from fields", async () => {
        const basePath = "/BaseId/TableName";
        const swaggerFields = extractFieldsFromRecords(airtableRecords.records);
        const paths = buildPaths({}, basePath, swaggerFields);
        expect(Object.keys(paths[basePath].get.responses["200"].schema.properties.records.items.properties.fields.properties).length).toEqual(11);
        expect(Object.keys(paths[basePath+"/{RecordID}"].get.responses["200"].schema.properties.fields.properties).length).toEqual(11);
    });
    test("builds a complete swagger file from fields", async () => {
        const basePath = "/app7Ns7bmcPNrCI3a/Inbound";
        const swaggerFields = extractFieldsFromRecords(airtableRecords.records);
        const paths = buildPaths({}, basePath, swaggerFields);
        const swagger = generateSwagger(paths);
        fs.writeFileSync("./tests/output/swagger_test_output.json", JSON.stringify(swagger, null, 2));
        const expected = JSON.parse(fs.readFileSync("./tests/fixtures/swagger_expected_output.json", "utf-8"));
        expect(swagger).toEqual(expected);
    });
});