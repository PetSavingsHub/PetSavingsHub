import { getDeals } from "@/actions/petsmart/getDeals";
import ItemCard from "@/components/common/ItemCard";
import { Suspense } from "react";

export default function WebMain({
  params
}: {
  params: {
    web: string;
  };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Items />
    </Suspense>
  )
}

async function Items() {
  const items = await getDeals(0, 36);
  return (
    <div className="w-full flex flex-wrap gap-12">
      {items.map((item, ind) => (
        <ItemCard key={ind} item={item} />
      ))}
    </div>
  );
}