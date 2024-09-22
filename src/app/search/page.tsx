import { search } from "@/actions/search/searchItems";
import ItemCard from "@/components/common/ItemCard";
import { Suspense } from "react";
import Loading from "./loading";

export default function SearchMain({
  searchParams
}: {
  searchParams: {
    name: string;
  }
}) {
  return (
    <>
      <h1 className="text-white mb-8 font-bold">Results for: "{searchParams.name}"</h1>
      <Suspense key={`${searchParams.name.replaceAll(" ", "-")}`} fallback={<Loading />}>
        <SearchResultsGrid name={searchParams.name} />
      </Suspense>
    </>
  )
}

async function SearchResultsGrid({
  name
}: {
  name: string
}) {
  const { products } = await search(name);
  return (
    <div className="w-full flex flex-wrap gap-12 mb-5">
      {products.map((item, ind) => (
        <ItemCard key={ind} item={item} />
      ))}
    </div>
  )
}