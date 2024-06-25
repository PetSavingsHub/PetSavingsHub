import { product } from "@/constants/commonTypes"
import { cn } from "@/lib/utils"
import PriceTooltip from "./PriceToolTip"

export default function ItemCard({
  item
}: {
  item: product
}) {
  return (
    <div className="min-w-[210px] w-[210px] h-[350px] bg-white p-5 rounded-lg shadow-lg grid grid-rows-5">
      <div className="row-span-3 w-full flex justify-center items-center">
        <img 
          src={item.img} 
          alt={item.name} 
          className="max-w-[95%] h-auto max-h-[90%]" 
        />
      </div>
      <div className="row-span-2 ">
        <p className="text-sm font-bold line-clamp-5">{item.name}</p>
      </div>
      <div className={cn("flex items-center gap-2", item.salesPrice ? "justify-start" : "justify-between")}>
        {
          item.salesPrice && (
            <p className="align-bottom text-sm font-bold text-red-700">{item.salesPrice}</p>
          )
        }
        <p className={cn("align-bottom", item.salesPrice ? "text-xs line-through text-slate-500" : "text-sm font-bold")}>
          {item.regularPrice}
        </p>
        {
          !item.salesPrice && item?.promotionalMessages && (
            <PriceTooltip tips={item.promotionalMessages} />
          )
        }
      </div>
    </div>
  )
}
