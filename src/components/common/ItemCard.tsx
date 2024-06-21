import { product } from "@/constants/commonTypes"
import { cn } from "@/lib/utils"

export default function ItemCard({
  item
}: {
  item: product
}) {
  return (
    <div className="min-w-[210px] w-[210px] h-[350px] bg-white p-5 rounded-lg shadow-lg grid grid-rows-5">
      <img 
        src={item.img} 
        alt={item.name} 
        className="row-span-3 max-w-[95%] h-auto" 
      />
      <p className="text-sm font-bold row-span-2">{item.name}</p>
      <div className="flex justify-start items-center gap-2">
        {
          item.salesPrice && (
            <p className="text-sm font-bold text-red-700">{item.salesPrice}</p>
          )
        }
        <p className={cn("", item.salesPrice ? "text-xs line-through text-slate-500" : "text-sm font-bold")}>
          {item.regularPrice}
        </p>
      </div>
    </div>
  )
}
