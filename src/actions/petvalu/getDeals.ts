"use server"

import { parseHtmlPetValu } from "@/lib/htmlParser/petValuParser";


const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

export async function getDeals(
    from: number,
    count: number
) {
    const DEAL_URL = `https://www.petvalu.ca/deals?page=${from}&pp=${count}`;
    const response = await fetch(DEAL_URL, {
        method: "GET",
        headers: {
            "User-Agent": UA,
        },
    });
    const data = await response.text();
    return parseHtmlPetValu(data);
}