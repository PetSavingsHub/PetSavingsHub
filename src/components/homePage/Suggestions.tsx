import { getDeals as petsmartGetdeals } from "@/actions/petsmart/getDeals";
import { getDeals as chewyGetDeals } from "@/actions/chewy/getDeals";
import { getDeals as petValuGetDeals } from "@/actions/petvalu/getDeals";
import { getDeals as rensPetGetDeals } from "@/actions/rensPet/getDeals";
import ItemCard from "../common/ItemCard";

export async function Suggestions({ web }: { web: string }) {
  const { products } = await getDeals(web, 0, 5);
  return (
    <div className="w-full h-fit py-5 overflow-x-auto">
      <div className="flex justify-start items-center gap-3">
        {products.map((product, index) => (
          <ItemCard item={product} key={index} />
        ))}
      </div>
    </div>
  );
}

async function getDeals(web: string, page: number, limit: number) {
  switch (web) {
    case "petsmart":
      return petsmartGetdeals(page, limit);
    case "chewy":
      return chewyGetDeals(page, limit);
    case "petvalu":
      return petValuGetDeals(page, limit);
    case "ren's pet":
      return rensPetGetDeals(page, limit);
    default:
      return { products: [] };
  }
}
