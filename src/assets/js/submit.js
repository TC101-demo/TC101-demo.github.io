// Submit wizard: builds a Markdown + YAML entry client-side and offers
// a GitHub PR prefilled URL or a direct download. No server, no auth.

const topics = JSON.parse(document.getElementById("topics-data").textContent);
const publications = JSON.parse(
  document.getElementById("publications-data").textContent
);
const site = JSON.parse(document.getElementById("site-data").textContent);

const form = document.getElementById("submit-form");
const kindSel = document.getElementById("f-kind");
const topicSel = document.getElementById("f-topic");
const pubSel = document.getElementById("f-publication");
const errorsBox = document.getElementById("errors");
const preview = document.getElementById("preview");
const previewBody = document.getElementById("preview-body");
const previewName = document.getElementById("preview-name");
const dlBtn = document.getElementById("btn-download");
const prBtn = document.getElementById("btn-pr");

initTopics();
initPublications();
initKindVisibility();
attachHandlers();

function initTopics() {
  const opts = [];
  for (const top of topics) {
    opts.push(`<option value="${esc(top.name)}">${esc(top.name)}</option>`);
    if (Array.isArray(top.children)) {
      for (const child of top.children) {
        const value = `${top.name}::${child}`;
        opts.push(
          `<option value="${esc(value)}">&nbsp;&nbsp;${esc(top.name)}::${esc(child)}</option>`
        );
      }
    }
  }
  topicSel.innerHTML = opts.join("");
}

function initPublications() {
  pubSel.insertAdjacentHTML(
    "beforeend",
    publications
      .map((p) => `<option value="${esc(p.id)}">${esc(p.full_name)}</option>`)
      .join("")
  );
}

function initKindVisibility() {
  const update = () => {
    const k = kindSel.value;
    document.querySelectorAll("[data-kind]").forEach((el) => {
      const allow = el.dataset.kind.split(",");
      const show = allow.includes(k);
      el.hidden = !show;
      el.querySelectorAll("input, select, textarea").forEach((c) => {
        c.disabled = !show;
      });
    });
  };
  kindSel.addEventListener("change", update);
  update();
}

function attachHandlers() {
  document
    .getElementById("btn-preview")
    .addEventListener("click", onValidate);
  dlBtn.addEventListener("click", onDownload);
}

let lastBuilt = null;

function onValidate() {
  errorsBox.innerHTML = "";
  preview.hidden = true;
  dlBtn.disabled = true;
  prBtn.hidden = true;

  const data = readForm();
  const errors = validate(data);
  if (errors.length) {
    errorsBox.innerHTML =
      `<div class="no-results"><strong>Please fix the following:</strong><ul>` +
      errors.map((e) => `<li>${esc(e)}</li>`).join("") +
      `</ul></div>`;
    return;
  }

  const fileContent = build(data);
  const path = buildPath(data);

  lastBuilt = { fileContent, path };
  previewName.textContent = path;
  previewBody.textContent = fileContent;
  preview.hidden = false;
  dlBtn.disabled = false;
  prBtn.hidden = false;
  prBtn.href = buildPrUrl(path, fileContent, data.title);
}

function readForm() {
  const fd = new FormData(form);
  const obj = Object.fromEntries(fd.entries());
  obj.kind = kindSel.value;
  obj.authors = String(obj.authors || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map(parseAuthorLine);
  if (obj.kind === "dataset" || obj.kind === "model") {
    obj.downloads = String(obj.downloads || "")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map(parseDownloadLine);
  } else {
    obj.downloads = undefined;
  }
  if (obj.kind === "competition") {
    obj.tasks = String(obj.tasks || "")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map(parseTaskLine);
    obj.organizers = obj.authors;
  }
  if (obj.kind === "model") {
    obj.framework = String(obj.framework_list || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    obj.tasks_model_list = String(obj.tasks_model || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  obj.keywords = String(obj.keywords || "")
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
  obj.language = String(obj.language || "")
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
  return obj;
}

function parseAuthorLine(line) {
  const parts = line.split("|").map((p) => p.trim());
  const out = { name: parts[0] || "" };
  if (parts[1]) out.affiliation = parts[1];
  if (parts[2]) out.email = parts[2];
  if (parts[3]) out.orcid = parts[3];
  if (parts[4]) out.website = parts[4];
  return out;
}

function parseDownloadLine(line) {
  const parts = line.split("|").map((p) => p.trim());
  const urls = (parts[1] || "")
    .split(",")
    .map((u) => u.trim())
    .filter(Boolean);
  const out = {
    filename: parts[0] || "",
    urls,
    type: parts[2] || "dataset",
  };
  if (parts[3]) out.dl_size = parts[3];
  if (parts[4]) out.description = parts[4];
  if (parts[5]) out.md5sum = parts[5];
  return out;
}

function parseTaskLine(line) {
  const parts = line.split("|").map((p) => p.trim());
  const out = { name: parts[0] || "" };
  if (parts[1]) out.description = parts[1];
  if (parts[2]) {
    out.metrics = parts[2]
      .split(",")
      .map((m) => m.trim())
      .filter(Boolean);
  }
  return out;
}

function validate(d) {
  const errs = [];
  if (!d.title || d.title.length < 3) errs.push("Title is required (≥3 chars).");
  if (!/^[A-Za-z0-9._-]+$/.test(d.slug || ""))
    errs.push("Slug must match [A-Za-z0-9._-]+.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d.submission_date || ""))
    errs.push("Submission date must be in YYYY-MM-DD format.");
  if (!d.topic) errs.push("Topic is required.");
  if (!d.authors || d.authors.length === 0) errs.push("At least one author is required.");
  if (!d.body || d.body.trim().length < 20)
    errs.push("Markdown body must be at least 20 characters.");

  if (d.kind === "dataset") {
    if (!d.license_identifier || !d.license_name)
      errs.push("Dataset entries need an SPDX identifier and a license name.");
    if (!d.downloads || d.downloads.length === 0)
      errs.push("Datasets need at least one download (filename | url | type).");
    else
      d.downloads.forEach((dl, i) => {
        if (!dl.filename || !dl.urls.length)
          errs.push(`Download #${i + 1}: filename and at least one URL are required.`);
        if (dl.md5sum && !/^[0-9a-fA-F]{32}$/.test(dl.md5sum))
          errs.push(`Download #${i + 1}: md5 must be 32 hex chars.`);
      });
  }
  if (d.kind === "software") {
    if (!d.repository_url) errs.push("Software entries need a repository URL.");
    if (!d.license_identifier || !d.license_name)
      errs.push("Software entries need an SPDX identifier and a license name.");
  }
  if (d.kind === "model") {
    if (!d.license_identifier || !d.license_name)
      errs.push("Model entries need an SPDX identifier and a license name.");
    if (!d.downloads || d.downloads.length === 0)
      errs.push("Models need at least one download (typically weights).");
  }
  if (d.kind === "competition") {
    if (!d.publication) errs.push("Competitions need a publication id (e.g. icdar_2024).");
    if (!d.tasks || d.tasks.length === 0)
      errs.push("Competitions need at least one task.");
  }
  return errs;
}

function build(d) {
  const fm = {
    layout: `layouts/${d.kind}.njk`,
    kind: d.kind,
    title: d.title,
    submission_date: d.submission_date,
  };
  if (d.version && (d.kind === "dataset" || d.kind === "software" || d.kind === "model"))
    fm.version = d.version;
  fm.topic = d.topic;
  if (d.publication) fm.publication = d.publication;

  if (d.kind === "competition") fm.organizers = d.organizers;
  else fm.authors = d.authors;

  if (d.kind !== "competition") {
    fm.license = {
      identifier: d.license_identifier,
      name: d.license_name,
    };
    if (d.license_url) fm.license.url_terms = d.license_url;
  }
  if (d.keywords?.length) fm.keywords = d.keywords;

  if (d.kind === "dataset") fm.downloads = d.downloads;
  if (d.kind === "software") {
    fm.repository_url = d.repository_url;
    if (d.language?.length) fm.language = d.language;
    if (d.maintenance_status) fm.maintenance_status = d.maintenance_status;
  }
  if (d.kind === "model") {
    if (d.architecture) fm.architecture = d.architecture;
    if (d.parameters) fm.parameters = d.parameters;
    if (d.framework?.length) fm.framework = d.framework;
    if (d.base_model) fm.base_model = d.base_model;
    if (d.tasks_model_list?.length) fm.tasks = d.tasks_model_list;
    fm.downloads = d.downloads;
  }
  if (d.kind === "competition") {
    fm.tasks = d.tasks;
    if (d.official_website) fm.official_website = d.official_website;
    if (d.report_url) fm.report_url = d.report_url;
    if (d.evaluation_tool_url) fm.evaluation_tool_url = d.evaluation_tool_url;
  }

  const yaml = toYaml(fm);
  return `---\n${yaml}---\n\n${d.body.trim()}\n`;
}

function buildPath(d) {
  const sub =
    d.kind === "dataset" ? "datasets" :
    d.kind === "software" ? "software" :
    d.kind === "model" ? "models" :
    "competitions";
  return `src/content/${sub}/${d.slug}.md`;
}

function buildPrUrl(filePath, content, title) {
  const repo = (site.repo || "")
    .replace(/^https?:\/\/github\.com\//, "")
    .replace(/\.git$/, "")
    .replace(/\/$/, "");
  if (!repo) return "#";
  const branch = site.default_branch || "main";
  // GitHub supports prefilled new-file via /new/<branch>?filename=...&value=...
  const params = new URLSearchParams({
    filename: filePath,
    value: content,
    message: `Add ${title}`,
  });
  return `https://github.com/${repo}/new/${branch}?${params.toString()}`;
}

function onDownload() {
  if (!lastBuilt) return;
  const blob = new Blob([lastBuilt.fileContent], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = lastBuilt.path.split("/").pop();
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// ---------------------------------------------------------------------------
// Minimal YAML serializer covering the subset we emit.
// Strings are double-quoted if they contain special chars; multi-line strings
// use block scalars; arrays/objects use block style.
// ---------------------------------------------------------------------------

function toYaml(value, indent = 0) {
  return serialize(value, indent);
}

function serialize(value, indent) {
  const pad = "  ".repeat(indent);
  if (value === null || value === undefined) return "null\n";
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]\n";
    return value
      .map((item) => {
        if (isScalar(item)) {
          return `${pad}- ${formatScalar(item)}\n`;
        }
        const nested = serialize(item, indent + 1).trimStart();
        return `${pad}- ${nested}`;
      })
      .join("");
  }
  if (typeof value === "object") {
    const keys = Object.keys(value);
    if (keys.length === 0) return "{}\n";
    return keys
      .map((k) => {
        const v = value[k];
        if (isScalar(v)) {
          return `${pad}${k}: ${formatScalar(v)}\n`;
        }
        if (Array.isArray(v) && v.length === 0) return `${pad}${k}: []\n`;
        if (typeof v === "object") {
          return `${pad}${k}:\n${serialize(v, indent + 1)}`;
        }
        return `${pad}${k}: ${formatScalar(v)}\n`;
      })
      .join("");
  }
  return `${pad}${formatScalar(value)}\n`;
}

function isScalar(v) {
  return (
    v === null ||
    v === undefined ||
    typeof v === "string" ||
    typeof v === "number" ||
    typeof v === "boolean"
  );
}

function formatScalar(v) {
  if (v === null || v === undefined) return "null";
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  const s = String(v);
  if (s === "") return "''";
  if (/^[A-Za-z0-9_./@:+#-]+$/.test(s) && !/^(true|false|null|yes|no|on|off)$/i.test(s)) {
    return s;
  }
  // Quoted, with double-quote escape.
  return `"${s.replaceAll("\\", "\\\\").replaceAll('"', '\\"')}"`;
}

function esc(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
