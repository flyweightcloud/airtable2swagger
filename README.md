![Flyweight Cloud_2_cropped_800](https://user-images.githubusercontent.com/2868/138356564-5747e68e-4df9-46db-8a77-bc48b3c711d7.png)



# Flyweight Airtable2Swagger
[![Tests](https://github.com/flyweightcloud/airtable2swagger/actions/workflows/test.yml/badge.svg)](https://github.com/flyweightcloud/airtable2swagger/actions/workflows/test.yml)

A tool for taking building Swagger 2.0 files from a single Airtable api query

## Why

There's no easy way to start using Airtable from Microsofts ecosystem (PowerApps / Flow).

This seeks to resolve that issue.

## CLI Usage

`npx @flyweightcloud/airtable2swagger https://api.airtable.com/v0/app7Ns7bmcPNrCI3a/Inbound?api_key=API_KEY  > swagger.json`

## Testing

```
npm ci
npm test
```
