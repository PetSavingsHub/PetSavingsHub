import { getDeals } from "@/actions/petsmart/getDeals";
import { product } from "@/constants/commonTypes";
import { parseHTML } from "@/lib/htmlParser/petSmartParser";
import { cn } from "@/lib/utils";

export async function Suggestions() {
  const suggestions = await getDeals(0, 5);

  return (
    <div className="w-full h-fit py-5 overflow-x-auto">
      <div className="flex justify-start items-center gap-3">
      {
        suggestions.map((suggestion, index) => (
          <SuggestItemCard suggestion={suggestion} key={index} />
        ))
      }
      </div>
    </div>
  )
}

function SuggestItemCard({
  suggestion
}: {
  suggestion: product
}) {
  return (
    <div className="min-w-[210px] w-[210px] h-[350px] bg-white p-5 rounded-lg shadow-lg grid grid-rows-5">
      <img 
        src={suggestion.img} 
        alt={suggestion.name} 
        className="row-span-3 max-w-[95%] h-auto" 
      />
      <p className="text-sm font-bold row-span-2">{suggestion.name}</p>
      <div className="flex justify-start items-center gap-2">
        {
          suggestion.salesPrice && (
            <p className="text-sm font-bold text-red-700">{suggestion.salesPrice}</p>
          )
        }
        <p className={cn("", suggestion.salesPrice ? "text-xs line-through text-slate-500" : "text-sm font-bold")}>
          {suggestion.regularPrice}
        </p>
      </div>
    </div>
  )
}