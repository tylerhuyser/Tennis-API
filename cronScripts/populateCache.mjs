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

      console.log(`Successfully fetched ${url}`);

      return true;
    } catch (err) {

      console.warn(
        `Attempt ${attempt} failed for ${url}: ${err.message}`
      );

      if (attempt < retries) {

        await new Promise((r) => setTimeout(r, RETRY_DELAY));

      } else {

        console.error(`Failed to fetch ${url} after ${retries} attempts`);
        return false
      }
    }
  }
}

async function populateCache() {
  let allSuccessful = true;

  for (const endpoint of endpoints) {
    const url = new URL(endpoint, BASE_URL).toString();
    await fetchWithRetries(url);
    if (!success) allSuccessful = false;
  }

  return allSuccessful;
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
  .then(async (success) => {
    if (success) {
      console.log("Cache population completed successfully.");
      await triggerNetlifyBuild();
    } else {
      console.error("Cache population had failures, skipping Netlify trigger.");
    }
  })
  .catch((err) => console.error("Unexpected error:", err));
