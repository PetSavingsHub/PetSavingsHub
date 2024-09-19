"use server"

import { parseHTML } from "@/lib/htmlParser/rensPetsParser";

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

export async function getDeals(
  page: number,
  limit: number,
  rule: string = "best-sellers"
) {
  const DEAL_URL = `https://www.renspets.com/categories/sale-page?page=${page}` //&start=${start}&sz=${size}&format=ajax`;
  const response = await fetch(DEAL_URL, {
    method: "GET",
    headers: {
      "User-Agent": UA,
    },
  });
  const data = await response.text();

  return parseHTML(data);
}
