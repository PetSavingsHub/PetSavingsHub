import { product } from "@/constants/commonTypes"
import { cn } from "@/lib/utils"
import PriceTooltip from "./PriceToolTip";
import Link from "next/link";
import Image from "next/image";
import ImageWithFallBack from "./Image";

export default function ItemCard({
  item
}: {
  item: product
}) {
  return (
    <Link href={item.href} target="_blank">
      <div className="relative min-w-[210px] w-[210px] h-[350px] bg-white p-5 rounded-lg shadow-lg grid grid-rows-5">
        {
          item.web && (
            <div className="absolute -top-3 -left-3 bg-gray-100 rounded-lg shadow-md p-2">
              {
                item.web === "petsmart"
                ? <Image src={"/PetSmart.png"} alt={"Pet Smart"} width={60} height={30} />
                : item.web === "petvalu"
                ? <Image src={"/PetValu.png"} alt={"Pet Valu"} width={60} height={30} />
                : item.web === "renspets"
                ? <Image src={"/RensPet.png"} alt={"Ren's Pets"} width={60} height={30} />
                : <Image src={"/Chewy.png"} alt={"Chewy"} width={60} height={30} />
              }
            </div>
          )
        }
        <div className="row-span-3 w-full flex justify-center items-center">
          <ImageWithFallBack 
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
    </Link>
  )
}
