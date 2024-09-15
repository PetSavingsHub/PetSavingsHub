"use server";

import { parserHtmlRensPet } from "@/lib/htmlParser/rensPetParser";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

export async function getDeals(from: number, count: number) {
  const DEAL_URL = `https://www.renspets.com/categories/sale-page?page=${from}&pp=${count}`;
  const response = await fetch(DEAL_URL, {
    method: "GET",
    headers: {
      "User-Agent": UA,
    },
  });
  const data = await response.text();
  return parserHtmlRensPet(data);
}
