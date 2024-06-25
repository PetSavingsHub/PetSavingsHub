"use server"

import { parseHTML } from "@/lib/htmlParser/petSmartParser";

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

export async function getDeals(
  start: number,
  size: number,
  rule: string = "best-sellers"
) {
  // await sleep(3000);
  const DEAL_URL = `https://www.petsmart.ca/sale/june/?pmin=0.01&srule=${rule}&start=${start}&sz=${size}&format=ajax`;
  const response = await fetch(DEAL_URL, {
    method: "POST",
    headers: {
      "User-Agent": UA,
    },
  });
  const data = await response.text();
  return parseHTML(data);
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
