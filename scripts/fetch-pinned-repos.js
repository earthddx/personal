import { writeFileSync, mkdirSync, readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env manually (no extra dependency needed)
const envPath = join(__dirname, "..", ".env");
if (existsSync(envPath)) {
  readFileSync(envPath, "utf-8")
    .split("\n")
    .filter((line) => line && !line.startsWith("#"))
    .forEach((line) => {
      const eqIdx = line.indexOf("=");
      if (eqIdx === -1) return;
      const key = line.slice(0, eqIdx).trim();
      const val = line.slice(eqIdx + 1).trim();
      if (key && !process.env[key]) process.env[key] = val;
    });
}

const token = process.env.GITHUB_TOKEN;
const username = "earthddx";

if (!token) {
  console.warn("GITHUB_TOKEN not set — skipping fetch, using existing data.");
  process.exit(0);
}

const query = `{
  user(login: "${username}") {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          url
          stargazerCount
          repositoryTopics(first: 6) {
            nodes { topic { name } }
          }
        }
      }
    }
  }
}`;

const res = await fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: {
    Authorization: `bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ query }),
});

if (!res.ok) {
  console.error(`GitHub API error: ${res.status} ${res.statusText}`);
  process.exit(1);
}

const { data, errors } = await res.json();

if (errors) {
  console.error("GraphQL errors:", errors);
  process.exit(1);
}

const repos = data.user.pinnedItems.nodes;
const outDir = join(__dirname, "..", "src", "data");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "pinnedRepos.json"), JSON.stringify(repos, null, 2));

console.log(`Fetched ${repos.length} pinned repos from GitHub.`);
