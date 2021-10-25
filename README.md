![Flyweight Cloud_2_cropped_400](https://user-images.githubusercontent.com/2868/138356735-fff5eb7e-2212-4380-a91b-5c715fe16be6.png)


# Flyweight Airtable2Swagger
[![Tests](https://github.com/flyweightcloud/airtable2swagger/actions/workflows/test.yml/badge.svg)](https://github.com/flyweightcloud/airtable2swagger/actions/workflows/test.yml)

A tool for building Swagger 2.0 definitions from a single Airtable API query.

**2021.10.21 - Warning, this is in beta and subject to change**

## Why

There's no easy way to start using Airtable from Microsofts ecosystem (PowerApps / Flow).

This seeks to resolve that issue.

## CLI Usage

- Simply visit [https://airtable.com/api](https://airtable.com/api) and select your workspace.
- Find the URL for the table you want to access (e.g. https://api.airtable.com/v0/app7Ns7bmcPNrCI3a/MyTable
- Get you API key from [https://airtable.com/account](https://airtable.com/account)
- Run the command below, but with the details from above inserted

`npx @flyweight.cloud/airtable2swagger https://api.airtable.com/v0/WorkSpaceID/MyTable?api_key=API_KEY  > swagger.json`

## Self-serve

Coming soon, a self-serve way to do this without and command line or code required.

## Testing

```
npm ci
npm test
```
