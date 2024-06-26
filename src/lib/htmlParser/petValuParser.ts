import { product } from '@/constants/commonTypes';
import { parse } from 'node-html-parser';

export async function parseHtmlPetValu(html:string){
    const products: product[] = [];
    const root = parse(html);
    const pages = root.querySelector('.page-buttons__wrapper')?.querySelectorAll('a');
    let maxPage = '';
    if(pages && pages.length){
        maxPage = pages[pages.length - 1].getAttribute('data-text') || '';
    }
    const itemsATags = root.querySelectorAll('.product-tile');
    itemsATags.forEach((item) => {
//TODO  当textcontent后面是？？时有bug：name is undefined,是||时无bug
        const nameLeft = item.querySelector('.title__left')?.querySelector('.P1.bold')?.textContent || '';
        const nameRight = item.querySelector('.title__right')?.querySelector('.P1.regular')?.textContent || '';
        const name = nameLeft + nameRight;
        const href = item.querySelector('img')?.getAttribute('src');
        const rewardProgram = item.querySelector('.your-rewards');

        const product: product = {
            name: (name || ""),
            href: href || "",
            img: "",
            regularPrice: "",
        };
        const imageNode = item.querySelector('img');
        if(imageNode){
            const image = imageNode.getAttribute('src');
            if (image != null) {
                product.img = image;
            }
        }
        const previousPrice = item.querySelector('.sale__previous-price');
        const currentPrice = item.querySelector('.sale__current-price');
        const defaultPrice = item.querySelector('.price__default');
        if(previousPrice || defaultPrice){
            const regularPriceText = previousPrice?.textContent ||  defaultPrice?.textContent;
            if (!regularPriceText) return;
            product.regularPrice = priceParser(regularPriceText);
        }
        if(currentPrice){
            const salesPriceText = currentPrice.textContent;
            if (!salesPriceText) return;
            product.salesPrice = priceParser(salesPriceText);
        }
        if(rewardProgram){
            const rewardText = rewardProgram.textContent;
            const message = "Your Rewards™ Program";
            if(rewardText){
                product.promotionalMessages = [];
                product.promotionalMessages?.push(message);
            }
        }
        products.push(product);

});
return {products, maxPage};
}

function priceParser(rawPrice: string) {
    return rawPrice
        .replace("Old Price\n", "")
        .replace("Discounted Price\n", "")
        .replaceAll("$", "")
        .replaceAll("\n", "")
        .trim();
}