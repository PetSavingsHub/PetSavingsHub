import { product } from '@/constants/commonTypes';
import { parse } from 'node-html-parser';

export function parseHTML(html: string) {
  const products: product[] = [];
  const root = parse(html);
  const paginationLinks = root.querySelectorAll('.pagination__link');
  const maxPage = paginationLinks[paginationLinks.length - 1].textContent;
  const items = root.querySelectorAll('.product-summary');
  items.forEach((item) => {
    const name = item.querySelector(".product-summary__name")?.textContent;
    const href = item.querySelector(".product-summary__link")?.getAttribute('href');
    const img = item.querySelector(".product-summary__media-image")?.getAttribute('src');
    const salesPrice = item.querySelector(".product-prices__price--sale")?.textContent;
    const regularPrice = item.querySelector(".product-prices__price--small")?.textContent || item.querySelector(".product-prices__price--autoship")?.textContent;
    const product: product = {
      name: (name || "").replace("&trade;", "™"), 
      href: `https://www.renspets.com${href}` || "", 
      img: img || "",
      salesPrice,
      regularPrice: regularPrice || "",
      promotionalMessages: salesPrice ? undefined : ["Only selected size is on sale"]
    };

    products.push(product);
  });

  return {products, maxPage};
}
