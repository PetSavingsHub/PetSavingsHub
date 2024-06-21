import { getDeals } from "@/actions/petsmart/getDeals";
import { product } from "@/constants/commonTypes";
import { parseHTML } from "@/lib/htmlParser/petSmartParser";
import { cn } from "@/lib/utils";
import ItemCard from "../common/ItemCard";

export async function Suggestions() {
  const suggestions = await getDeals(0, 5);

  return (
    <div className="w-full h-fit py-5 overflow-x-auto">
      <div className="flex justify-start items-center gap-3">
      {
        suggestions.map((suggestion, index) => (
          <ItemCard item={suggestion} key={index} />
        ))
      }
      </div>
    </div>
  )
}
