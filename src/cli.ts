#!/usr/bin/env node
import * as https from "https";
import { buildPaths, extractFieldsFromRecords, generateSwagger } from "./swagger";

const build = (basePath: string, airtableRecords) => {
        const swaggerFields = extractFieldsFromRecords(airtableRecords);
        const paths = buildPaths({}, basePath, swaggerFields);
        const swagger = generateSwagger(paths);
        process.stdout.write(JSON.stringify(swagger, null, 2));
};

const fetchRecords = async (uri: URL): Promise<object[]> => {
  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    hostname: uri.hostname,
    port: uri.port,
    path: `${uri.pathname}${uri.search}`,
    protocol: "https:",
  };

  return new Promise((resolve, reject) => {
    const req = https.request(opts, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", () => {
        if (res.statusCode === 200) {
          const records = JSON.parse(body).records;
          return resolve(records);
        }
        reject(new Error(`Bad request (${res.statusCode}): ${body}`));
      });
    });

    req.on("error", (e) => {
      reject(e);
    });

    req.end();
  });
};

const main = async () => {
  const arg = process.argv[process.argv.length - 1];
  const url = new URL(arg);
  const basePath = url.pathname.split("/").slice(-1)[0];
  const records = await fetchRecords(url);
  build(basePath, records);
};

main().catch((err: Error) => {
  process.stdout.write(err.message);
  process.exit(1);
});
