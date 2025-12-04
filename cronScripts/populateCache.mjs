import fetch from "node-fetch";
import { URL } from "url"

const BASE_URL = "https://tennis-api.fly.dev/api/";
const NETLIFY_BUILD_HOOK = process.env.NETLIFY_BUILD_HOOK

const endpoints = [
  "atp/rankings/singles",
  "atp/rankings/singles-race",
  "atp/rankings/doubles",
  "atp/rankings/doubles-race",
  "wta/rankings/singles",
  "wta/rankings/singles-race",
  "wta/rankings/doubles",
  "wta/rankings/doubles-race",
];

const MAX_RETRIES = 10;
const RETRY_DELAY = 5000;

async function fetchWithRetries(url, retries = MAX_RETRIES) {

  for (let attempt = 1; attempt <= retries; attempt++) {

    try {
      const res = await fetch(url);

      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

      const data = await res.json();
      console.log(`Successfully fetched ${url} - source: ${data.source}`);
      
      const wasUpdated = data.source === 'fresh';
      return { success: true, wasUpdated };

    } catch (err) {
      console.warn(
        `Attempt ${attempt} failed for ${url}: ${err.message}`
      );
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY));
      } else {
        console.error(`Failed to fetch ${url} after ${retries} attempts`);
        return  { success: false, wasUpdated: false };
      }
    }
  }
}

async function populateCache() {
  let allSuccessful = true;
  let anyUpdated = false;

  for (const endpoint of endpoints) {
    const url = new URL(endpoint, BASE_URL).toString();
    const result = await fetchWithRetries(url);
    if (!result.success) allSuccessful = false;
    if (result.wasUpdated) anyUpdated = true;
  }

  return { allSuccessful, anyUpdated };
}


async function triggerNetlifyBuild() {
  if (!NETLIFY_BUILD_HOOK) {
    console.warn("NETLIFY_BUILD_HOOK not set, skipping rebuild trigger");
    return;
  }
  
  try {
    const res = await fetch(NETLIFY_BUILD_HOOK, { method: 'POST' });
    if (res.ok) {
      console.log("Netlify build triggered successfully");
    } else {
      console.error(`Failed to trigger Netlify build: ${res.status}`);
    }
  } catch (err) {
    console.error("Error triggering Netlify build:", err.message);
  }
}

populateCache()
  .then(async ({ allSuccessful, anyUpdated }) => {
    if (allSuccessful && anyUpdated) {
      console.log("Cache updated with fresh data - triggering Netlify rebuild");
      await triggerNetlifyBuild();
    } else if (allSuccessful && !anyUpdated) {
      console.log("All data still fresh from cache - no rebuild needed");
    } else {
      console.warn("Some endpoints failed - skipping Netlify rebuild");
    }
  })
  .catch((err) => console.error("Unexpected error:", err));
