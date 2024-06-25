"use server"

import { parseJson } from "@/lib/jsonParser/chewyParser";

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

export async function getDeals(
  from: number,
  count: number
) {
  const DEAL_URL = `https://www.chewy.com/ca/plp/api/search?groupResults=true&count=${count}&include=items&fields%5B0%5D=PRODUCT_CARD_DETAILS&omitNullEntries=true&from=${from}&sort=byRelevance`;
  const response = await fetch(DEAL_URL, {
    method: "GET",
    headers: {
      "User-Agent": UA,
    },
  });
  const data = await response.json();
  return {products: parseJson(data.products), maxPage: `${Math.ceil(data.recordSetTotal / count)}`};
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
