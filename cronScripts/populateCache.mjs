import fetch from "node-fetch";
import { URL } from "url"

const BASE_URL = "https://tennis-api.fly.dev/api/";

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

      return;
    } catch (err) {

      console.warn(
        `Attempt ${attempt} failed for ${url}: ${err.message}`
      );

      if (attempt < retries) {

        await new Promise((r) => setTimeout(r, RETRY_DELAY));

      } else {

        console.error(`Failed to fetch ${url} after ${retries} attempts`);
      }
    }
  }
}

async function populateCache() {
  for (const endpoint of endpoints) {
    const url = new URL(endpoint, BASE_URL).toString();
    await fetchWithRetries(url);
  }
}

populateCache()
  .then(() => console.log("Cache population finished"))
  .catch((err) => console.error("Unexpected error:", err));
