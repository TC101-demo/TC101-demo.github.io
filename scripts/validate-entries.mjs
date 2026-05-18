#!/usr/bin/env node
// Validate every entry front-matter against its JSON Schema.
// Also enforces cross-file invariants:
//   - the `topic` value (top level) must exist in src/_data/topics.yml
//   - any `publication` value must exist in src/_data/publications.yml
//
// Exit code: 0 on success, 1 on any validation error.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import matter from "gray-matter";
import yaml from "js-yaml";
import Ajv2020 from "ajv/dist/2020.js";
import addFormatsModule from "ajv-formats";

const addFormats = addFormatsModule.default ?? addFormatsModule;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const SCHEMA_FILES = {
  dataset: path.join(repoRoot, "schemas/dataset.schema.json"),
  software: path.join(repoRoot, "schemas/software.schema.json"),
  model: path.join(repoRoot, "schemas/model.schema.json"),
  competition: path.join(repoRoot, "schemas/competition.schema.json"),
};

const CONTENT_DIRS = {
  dataset: "src/content/datasets",
  software: "src/content/software",
  model: "src/content/models",
  competition: "src/content/competitions",
};

function loadSchemas() {
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);
  const validators = {};
  for (const [kind, file] of Object.entries(SCHEMA_FILES)) {
    const schema = JSON.parse(fs.readFileSync(file, "utf8"));
    validators[kind] = ajv.compile(schema);
  }
  return validators;
}

function loadYamlList(relPath) {
  const file = path.join(repoRoot, relPath);
  if (!fs.existsSync(file)) return [];
  return yaml.load(fs.readFileSync(file, "utf8")) ?? [];
}

function flattenTopics(topicTree) {
  const set = new Set();
  for (const node of topicTree) {
    set.add(node.name);
    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        set.add(`${node.name}::${child}`);
      }
    }
  }
  return set;
}

function listMarkdownFiles(relDir) {
  const absDir = path.join(repoRoot, relDir);
  if (!fs.existsSync(absDir)) return [];
  return fs
    .readdirSync(absDir, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith(".md"))
    .map((d) => path.join(absDir, d.name));
}

function main() {
  const validators = loadSchemas();
  const topics = flattenTopics(loadYamlList("src/_data/topics.yml"));
  const publications = new Set(
    (loadYamlList("src/_data/publications.yml") ?? []).map((p) => p.id)
  );

  let errorCount = 0;
  let fileCount = 0;

  for (const [kind, dir] of Object.entries(CONTENT_DIRS)) {
    const files = listMarkdownFiles(dir);
    for (const file of files) {
      fileCount += 1;
      const rel = path.relative(repoRoot, file);
      const raw = fs.readFileSync(file, "utf8");
      const parsed = matter(raw);
      const fm = parsed.data;

      const validate = validators[kind];
      if (!validate(fm)) {
        errorCount += 1;
        console.error(`\n[ERROR] ${rel}`);
        for (const err of validate.errors ?? []) {
          console.error(
            `  - ${err.instancePath || "/"} ${err.message ?? ""}` +
              (err.params ? ` ${JSON.stringify(err.params)}` : "")
          );
        }
        continue;
      }

      // Cross-file invariants
      if (fm.topic && !topicAllowed(fm.topic, topics)) {
        errorCount += 1;
        console.error(
          `\n[ERROR] ${rel}\n  - topic "${fm.topic}" is not in src/_data/topics.yml`
        );
      }
      if (fm.publication && !publications.has(fm.publication)) {
        errorCount += 1;
        console.error(
          `\n[ERROR] ${rel}\n  - publication "${fm.publication}" is not in src/_data/publications.yml`
        );
      }
    }
  }

  if (errorCount > 0) {
    console.error(
      `\nValidation failed: ${errorCount} error(s) across ${fileCount} entries.`
    );
    process.exit(1);
  }
  console.log(`OK: ${fileCount} entries validated against their schemas.`);
}

function topicAllowed(topic, allowed) {
  // Accept either a known leaf path "A::B" or the top-level "A".
  if (allowed.has(topic)) return true;
  const parts = topic.split("::");
  // Allow deeper hierarchies if their first 2 levels are known.
  if (parts.length >= 2) {
    return allowed.has(`${parts[0].trim()}::${parts[1].trim()}`);
  }
  return false;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
