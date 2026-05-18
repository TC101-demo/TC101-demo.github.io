// Client-side browse: search + facets + sort + URL state sync.
// Reads /search-index.json (produced by Eleventy at build time).
// No external dependencies. Works offline once the page is loaded.

const INDEX_URL = withBase("/search-index.json");

const FACETS = ["kind", "topic_top", "publication", "license_family"];

const state = {
  q: "",
  sort: "date-desc",
  filters: Object.fromEntries(FACETS.map((f) => [f, new Set()])),
};

let allEntries = [];

async function init() {
  const res = await fetch(INDEX_URL);
  if (!res.ok) {
    document.getElementById("results").innerHTML =
      `<p class="no-results">Could not load the search index (${res.status}). Try refreshing the page.</p>`;
    return;
  }
  allEntries = await res.json();

  readStateFromURL();
  populateDynamicFacets();
  bindUI();
  render();
}

function withBase(path) {
  const base = document.querySelector("base")?.getAttribute("href") || "/";
  return new URL(path.replace(/^\//, ""), new URL(base, location.origin)).pathname;
}

function readStateFromURL() {
  const params = new URLSearchParams(location.search);
  state.q = params.get("q") ?? "";
  state.sort = params.get("sort") ?? "date-desc";
  for (const f of FACETS) {
    const v = params.get(f);
    state.filters[f] = new Set(v ? v.split(",").filter(Boolean) : []);
  }
}

function writeStateToURL() {
  const params = new URLSearchParams();
  if (state.q) params.set("q", state.q);
  if (state.sort !== "date-desc") params.set("sort", state.sort);
  for (const f of FACETS) {
    if (state.filters[f].size > 0) {
      params.set(f, Array.from(state.filters[f]).join(","));
    }
  }
  const qs = params.toString();
  const newUrl = qs ? `${location.pathname}?${qs}` : location.pathname;
  history.replaceState(null, "", newUrl);
}

function bindUI() {
  const q = document.getElementById("q");
  q.value = state.q;
  q.addEventListener("input", (e) => {
    state.q = e.target.value;
    render();
  });

  const sort = document.getElementById("sort");
  sort.value = state.sort;
  sort.addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });

  document
    .getElementById("reset-filters")
    .addEventListener("click", () => {
      state.q = "";
      state.sort = "date-desc";
      for (const f of FACETS) state.filters[f].clear();
      q.value = "";
      sort.value = "date-desc";
      document
        .querySelectorAll(".facet-list input[type='checkbox']")
        .forEach((c) => (c.checked = false));
      render();
    });

  document.querySelectorAll(".facet-list").forEach((ul) => {
    const facet = ul.dataset.facet;
    if (!facet) return;
    ul.addEventListener("change", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement)) return;
      const v = target.value;
      if (target.checked) state.filters[facet].add(v);
      else state.filters[facet].delete(v);
      render();
    });
  });
}

function populateDynamicFacets() {
  // Topic and publication checkboxes are derived from the data.
  const topicCounts = new Map();
  const publicationCounts = new Map();
  for (const e of allEntries) {
    if (e.topic_top) {
      topicCounts.set(e.topic_top, (topicCounts.get(e.topic_top) ?? 0) + 1);
    }
    if (e.publication) {
      publicationCounts.set(
        e.publication,
        (publicationCounts.get(e.publication) ?? 0) + 1
      );
    }
  }

  renderFacetList("facet-topic", "topic_top", sortedByCount(topicCounts));
  renderFacetList(
    "facet-publication",
    "publication",
    sortedByCount(publicationCounts, "desc-key")
  );

  syncCheckboxesFromState();
}

function sortedByCount(map, mode = "count") {
  const entries = Array.from(map.entries());
  if (mode === "desc-key") {
    entries.sort((a, b) => b[0].localeCompare(a[0]));
  } else {
    entries.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }
  return entries;
}

function renderFacetList(id, facet, entries) {
  const ul = document.getElementById(id);
  if (!ul) return;
  ul.innerHTML = entries
    .map(
      ([value, count]) => `
      <li>
        <label>
          <input type="checkbox" value="${escapeHtml(value)}" />
          ${escapeHtml(formatFacetLabel(facet, value))}
          <span class="count" data-count-for="${facet}:${escapeHtml(value)}">(${count})</span>
        </label>
      </li>`
    )
    .join("");
}

function formatFacetLabel(facet, value) {
  if (facet === "publication") return value.replace(/_/g, " ").toUpperCase();
  return value;
}

function syncCheckboxesFromState() {
  document
    .querySelectorAll(".facet-list input[type='checkbox']")
    .forEach((c) => {
      const facet = c.closest("ul.facet-list")?.dataset.facet;
      if (!facet) return;
      c.checked = state.filters[facet].has(c.value);
    });
}

function render() {
  writeStateToURL();
  const filtered = filterEntries(allEntries);
  const sorted = sortEntries(filtered);
  renderResults(sorted);
  updateFacetCounts(allEntries);
  updateSummary(sorted.length, allEntries.length);
}

function filterEntries(entries) {
  const q = state.q.trim().toLowerCase();
  return entries.filter((e) => {
    for (const f of FACETS) {
      if (state.filters[f].size === 0) continue;
      if (!state.filters[f].has(e[f] ?? "")) return false;
    }
    if (!q) return true;
    const haystack = [
      e.title,
      (e.authors || []).join(" "),
      (e.keywords || []).join(" "),
      e.excerpt,
      e.topic,
      e.license_id,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

function sortEntries(entries) {
  const arr = [...entries];
  switch (state.sort) {
    case "date-asc":
      arr.sort((a, b) =>
        (a.submission_date || "").localeCompare(b.submission_date || "")
      );
      break;
    case "title-asc":
      arr.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "title-desc":
      arr.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "date-desc":
    default:
      arr.sort((a, b) =>
        (b.submission_date || "").localeCompare(a.submission_date || "")
      );
  }
  return arr;
}

function renderResults(entries) {
  const root = document.getElementById("results");
  if (entries.length === 0) {
    root.innerHTML = `<p class="no-results">No entries match the current filters.</p>`;
    return;
  }
  root.innerHTML = entries
    .map(
      (e) => `
    <article class="entry-card">
      <h3><a href="${escapeAttr(e.url)}">${escapeHtml(e.title)}</a></h3>
      <div class="entry-card__pills">
        <span class="pill pill--${escapeAttr(e.kind || 'default')}">${escapeHtml(e.kind || '')}</span>
        ${e.publication ? `<span class="pill pill--publication">${escapeHtml(e.publication.replace(/_/g, " ").toUpperCase())}</span>` : ""}
      </div>
      <div class="entry-card__meta">
        <span>${escapeHtml(e.submission_date || "")}</span>
        ${e.topic_top ? `<span>•</span><span>${escapeHtml(e.topic_top)}</span>` : ""}
        ${e.license_id ? `<span>•</span><span>${escapeHtml(e.license_id)}</span>` : ""}
      </div>
      ${e.excerpt ? `<p class="entry-card__excerpt">${escapeHtml(truncate(e.excerpt, 220))}</p>` : ""}
    </article>`
    )
    .join("");
}

function updateFacetCounts(entries) {
  // Counts reflect entries that match *all other* filters but not this one,
  // i.e. classic "or within facet, and across facets" behavior.
  for (const facet of FACETS) {
    const others = { ...state.filters, [facet]: new Set() };
    const reduced = entries.filter((e) => {
      for (const f of FACETS) {
        if (others[f].size === 0) continue;
        if (!others[f].has(e[f] ?? "")) return false;
      }
      return true;
    });
    const counts = new Map();
    for (const e of reduced) {
      const v = e[facet];
      if (!v) continue;
      counts.set(v, (counts.get(v) ?? 0) + 1);
    }
    document
      .querySelectorAll(`[data-count-for^="${facet}:"]`)
      .forEach((span) => {
        const v = span.dataset.countFor.slice(facet.length + 1);
        span.textContent = `(${counts.get(v) ?? 0})`;
      });
  }
}

function updateSummary(shown, total) {
  const s = document.getElementById("result-summary");
  if (!s) return;
  s.textContent =
    shown === total
      ? `${total} entries`
      : `${shown} of ${total} entries match the current filters`;
}

function escapeHtml(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(s) {
  return escapeHtml(s);
}

function truncate(s, n) {
  if (!s || s.length <= n) return s ?? "";
  return s.slice(0, n - 1).trim() + "\u2026";
}

init().catch((err) => {
  console.error(err);
  document.getElementById("results").innerHTML =
    `<p class="no-results">Failed to initialize browse: ${escapeHtml(String(err))}</p>`;
});
