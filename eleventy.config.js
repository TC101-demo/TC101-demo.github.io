// Eleventy config for the IAPR TC10/TC11 curated catalog.
// See https://www.11ty.dev/docs/config/ for documentation.

import yaml from "js-yaml";

export default function (eleventyConfig) {
  eleventyConfig.addDataExtension("yml,yaml", (contents) => yaml.load(contents));

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "images": "images" });

  eleventyConfig.addWatchTarget("src/assets/");
  eleventyConfig.addWatchTarget("schemas/");

  // ---------------------------------------------------------------------------
  // Collections
  // ---------------------------------------------------------------------------
  eleventyConfig.addCollection("datasets", (api) =>
    api
      .getFilteredByGlob("src/content/datasets/*.md")
      .sort(byDateDesc)
  );
  eleventyConfig.addCollection("software", (api) =>
    api
      .getFilteredByGlob("src/content/software/*.md")
      .sort(byDateDesc)
  );
  eleventyConfig.addCollection("models", (api) =>
    api
      .getFilteredByGlob("src/content/models/*.md")
      .sort(byDateDesc)
  );
  eleventyConfig.addCollection("competitions", (api) =>
    api
      .getFilteredByGlob("src/content/competitions/*.md")
      .sort(byDateDesc)
  );

  eleventyConfig.addCollection("entries", (api) =>
    api
      .getFilteredByGlob([
        "src/content/datasets/*.md",
        "src/content/software/*.md",
        "src/content/models/*.md",
        "src/content/competitions/*.md",
      ])
      .sort(byDateDesc)
  );

  // ---------------------------------------------------------------------------
  // Filters
  // ---------------------------------------------------------------------------
  eleventyConfig.addFilter("date_iso", (value) => {
    if (!value) return "";
    const d = value instanceof Date ? value : new Date(value);
    return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
  });

  eleventyConfig.addFilter("date_human", (value) => {
    if (!value) return "";
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  });

  eleventyConfig.addFilter("year", (value) => {
    if (!value) return "";
    const d = value instanceof Date ? value : new Date(value);
    return Number.isNaN(d.getTime()) ? "" : String(d.getFullYear());
  });

  eleventyConfig.addFilter("topic_path", (topic) =>
    typeof topic === "string" ? topic.split("::").map((s) => s.trim()) : []
  );

  eleventyConfig.addFilter("topic_top", (topic) => {
    if (typeof topic !== "string") return "";
    return topic.split("::")[0].trim();
  });

  eleventyConfig.addFilter("license_family", (license) => {
    if (!license || !license.identifier) return "unspecified";
    const id = String(license.identifier).toLowerCase();
    if (id.includes("nc")) return "non-commercial";
    if (id.includes("sa")) return "share-alike";
    if (id === "cc0-1.0" || id.startsWith("mit") || id.startsWith("apache")
      || id.startsWith("bsd") || id.startsWith("cc-by-4.0")
      || id.startsWith("cc-by-3.0")) return "permissive";
    return "other";
  });

  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));

  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array)) return [];
    return n < 0 ? array.slice(n) : array.slice(0, n);
  });

  eleventyConfig.addFilter("urlencode", (value) =>
    encodeURIComponent(String(value ?? ""))
  );
  eleventyConfig.addFilter("first_paragraph", (content) => {
    if (typeof content !== "string") return "";
    const stripped = content
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<pre[\s\S]*?<\/pre>/gi, "")
      .replace(/<code[\s\S]*?<\/code>/gi, "");
    const pMatch = stripped.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    const raw = pMatch ? pMatch[1] : stripped;
    return raw
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["md", "njk", "html", "11ty.js"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}

function byDateDesc(a, b) {
  const da = pickDate(a);
  const db = pickDate(b);
  return db - da;
}

function pickDate(item) {
  const d =
    item.data.submission_date ??
    item.data.date ??
    item.date ??
    0;
  const parsed = d instanceof Date ? d : new Date(d);
  return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime();
}
