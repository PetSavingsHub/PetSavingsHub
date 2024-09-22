import { getDeals as petsmartGetDeals } from "@/actions/petsmart/getDeals";
import { getDeals as chewyGetDeals } from "@/actions/chewy/getDeals";
import { getDeals as petValuGetDeals } from "@/actions/petvalu/getDeals";
import { getDeals as rensPetsGetDeals } from "@/actions/renspets/getDeals";
import ItemCard from "@/components/common/ItemCard";
import Pages from "@/components/common/Pagination";
import { Suspense } from "react";
import Loading from "./loading";
import { webs } from "@/constants/webs";
import Image from "next/image";

export default function WebMain({
  params,
  searchParams
}: {
  params: {
    web: string;
  }
  searchParams: {
    page?: string;
  }
}) {
  return (
    <Suspense fallback={<Loading />}>
      <Items web={params.web} page={searchParams.page || "1"} />
    </Suspense>
  )
}

async function Items({
  web,
  page
}: {
  web: string
  page: string
}) {
  try {
    if (parseInt(page) < 1) {
      return <div>Page not found</div>;
    }
  } catch {
    <div>Something went wrong</div>;
  }

  const {products, maxPage} = await getDeals(web, page);
  try {
    if (parseInt(page) > parseInt(maxPage as string)) {
      console.log("Page is bigger than max page", maxPage)
      return <div>Page not found</div>;
    }
  } catch {
    <div>Something went wrong</div>;
  }
  return (
    <>
      <div className="flex w-full justify-between items-center pb-4">
        {/* <h1 className="text-2xl font-bold text-white text-nowrap">{webs.filter(w => w.id === web)[0].name}</h1> */}
        <div className="flex items-center gap-2">
          <Image src={webs.filter(w => w.id === web)[0].logo} alt={web} width={120} height={90} />
          <h1 className="text-xl font-bold text-white text-nowrap">Deals</h1>
        </div>
        <Pages maxPage={maxPage} currentPage={page} className="justify-end" />
      </div>
      <div className="w-full flex flex-wrap gap-12 mb-5">
        {products.map((item, ind) => (
          <ItemCard key={ind} item={item} />
        ))}
      </div>
      <Pages maxPage={maxPage} currentPage={page} />
    </>
  );
}

async function getDeals(web: string, page: string) {
  switch (web) {
    case "petsmart":
      return await petsmartGetDeals((parseInt(page)-1) * 36, 36);
    case "chewy":
      return await chewyGetDeals((parseInt(page)-1) * 36, 36);
    case "petvalu":
      return await petValuGetDeals((parseInt(page)), 36);
    case "renspets":
      return await rensPetsGetDeals((parseInt(page)), 36);
    default:
      return {
        products: [],
        maxPage: ""
      };
  }
}