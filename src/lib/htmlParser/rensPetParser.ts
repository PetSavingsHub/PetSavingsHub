import { product } from "@/constants/commonTypes";
import { parse } from "node-html-parser";

export function parserHtmlRensPet(html: string) {
  const products: product[] = [];
  const root = parse(html);

  const pages = root.querySelector('.pagination__list')?.querySelectorAll('li');
  let maxPage = '';
  if (pages && pages.length) {
    maxPage = pages[pages.length - 2].querySelector('a')?.textContent || '';
  }

  const itemsATags = root.querySelectorAll('.product-summary');

  itemsATags.map(item => {
    const brand = item.querySelector('.product-summary__brand')?.textContent || '';
    const name = item.querySelector('.product-summary__name')?.textContent || '';
    const href = item.querySelector('.product-summary__media-container img')?.getAttribute('src');

    const regularPrice = item
      .querySelectorAll(".product-prices__price--small s")
      .map((ele) => ele.textContent)
      .join("");
    
    const salesPrice = item
      .querySelectorAll(".product-prices__price--sale span")
      .map((ele) => ele.textContent)
      .join("");
    
    const autoshipPriceSection = item.querySelector('.product-prices__price--autoship');
    const autoshipPrice = autoshipPriceSection?
      .querySelectorAll('span')
      .map((ele) => ele.textContent)
      .join('');
    
    const product: product = {
      name: `${brand}\n${name}` || "",
      href: href || "",
      img: href || "",
      regularPrice: priceParser(regularPrice) || priceParser(autoshipPrice) || "",
      salesPrice: priceParser(salesPrice) || "",
      promotionalMessages: []
    };

    products.push(product);
  })

  return { products, maxPage };
}

function priceParser(rawPrice: string) {
  return rawPrice
    .replace("Old Price\n", "")
    .replace("Discounted Price\n", "")
    .replaceAll("$", "")
    .replaceAll("\n", "")
    .trim();
}
