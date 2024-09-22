import { product } from "@/constants/commonTypes";
import { parseSearchResults as petSmartParseSearchResults } from "@/lib/htmlParser/petSmartParser";
import { parseHtmlPetValu as petValuParseSearchResults } from "@/lib/htmlParser/petValuParser";
import { parseHTML as rensPetsParseSearchResults } from "@/lib/htmlParser/rensPetsParser";

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

export async function search(name: string) {
  // const PetSmartSearch = `https://www.petsmart.ca/search?q=${name}&st=manual`;
  // const PetSmartResponse = await fetch(PetSmartSearch);
  // const PetSmartData = await PetSmartResponse.text();
  // const PetSmartSearchResults = petSmartParseSearchResults(PetSmartData);
  // return PetSmartSearchResults;
  const results = await Promise.all([
    searchPetSmart(name),
    searchPetValu(name),
    searchRensPets(name),
    // searchChewy(name)
  ]);

  return {products: shuffleMaintainingSubarrayOrder(results)};
}

async function searchPetSmart(name: string) {
  const search = `https://www.petsmart.ca/search?q=${name}&st=manual`;
  const response = await fetch(search);
  const data = await response.text();
  const searchResults = petSmartParseSearchResults(data, "petsmart");
  return searchResults.products;
}

async function searchPetValu(name: string) {
  const search = `https://www.petvalu.ca/search?query=${name}`;
  const response = await fetch(search);
  const data = await response.text();
  const searchResults = petValuParseSearchResults(data, "petvalu");
  return searchResults.products;
}

async function searchRensPets(name: string) {
  // const search = `https://www.renspets.com/search?q=${name}&button=search`;
  // const response = await fetch(search);
  // const data = await response.text();
  // const searchResults = rensPetsParseSearchResults(data, "renspets");
  // return searchResults.products;
  const results = await Promise.all([
    searchRensPetsPage(name, 1),
    searchRensPetsPage(name,2),
  ]);

  return results.flat();
}

async function searchRensPetsPage(name: string, page: number) {
  const search = `https://www.renspets.com/search?q=${name}&page=${page}&button=search`;
  const response = await fetch(search);
  const data = await response.text();
  const searchResults = rensPetsParseSearchResults(data, "renspets");
  return searchResults.products;
}

async function searchChewy(name: string) {
  const search = `https://www.chewy.com/ca/s?query=${name}&nav-submit-button=`;
  const response = await fetch(search, {
    method: "GET",
    headers: {
      "User-Agent": UA,
      "Cookie": "_abck=47DDD2E24F2956D0E4AEBD1869E5CDB5~-1~YAAQzug3F55EXQaSAQAAq/hLGgxxeEhnzUkHuAM/kgPnfNiYvsp5OqMg7XxaU5os8xH9IzM10EV3UMNth9zO6aKa6fuVrE/MsSQdkeoesy491gI2J+sJFZL5m7ReAtSoQGAqliQ4CstzuKaLmQFhAJgaNhSCU4WmMJj82nZJCsCuuZkDbSSkE+VIoTSK2vAfJyHjbfSQAWVTPagcHCfORvjulnLjwvbYC90UqO1GVbroWviIq40hxnxI99smmgC4PEiKNU2UQ4Tpx++e7Obn9vPNek2vshTyRzGD8MXjJMtlCHVco5IRQ+BpAdSxIZYih98h6m+QWsusYXslXsOq2Dog0jY7t9XShhkZOH/w/amxAufK7/FBJVie5b4+/Pbb8rVZtuVO3PrcV+qeNJEwYvjoh3AH+euE0QyMTEe4kCL60lirhKjeO30j26qD9S8bRvQrzo/wL9XEnwQ6SsUNNH6CLGnpold6OzbW+xi2WqRjIdz2hZlRBrpQok4WTnXwHOKP0gS86ExEEJ53L3ZiVU5Jxg==~-1~-1~-1",
      "referer": "https://www.chewy.com/ca/",
      "sec-ch-ua": '"Chromium";v="129", "Not=A?Brand";v="8"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "macOS",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "accept-language": "en-US,en;q=0.9",
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
    },
  });
  const data = await response.text();
  console.log(data);
  return {products: []};
  // const searchResults = petSmartParseSearchResults(data);
  // return searchResults.products;
}

function shuffleMaintainingSubarrayOrder(bigArray: product[][]) {
  const result: product[] = [];
  const subarrays = bigArray.map(arr => [...arr]); // Copy subarrays to avoid mutation

  // Loop until all subarrays are empty
  while (subarrays.some(subarray => subarray.length > 0)) {
    // Get a list of indices of non-empty subarrays
    const nonEmptySubarrays = subarrays
      .map((subarray, index) => (subarray.length > 0 ? index : -1))
      .filter(index => index !== -1);

    // Pick a random subarray from the list of non-empty subarrays
    const randomIndex = Math.floor(Math.random() * nonEmptySubarrays.length);
    const chosenSubarrayIndex = nonEmptySubarrays[randomIndex];

    // Remove the first element from the chosen subarray and push it to the result
    const currentProd = subarrays[chosenSubarrayIndex].shift();
    if (currentProd) result.push(currentProd);
  }

  return result;
}

