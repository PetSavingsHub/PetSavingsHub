import Logo from "@/components/common/Logo";
import { NavBar } from "@/components/header/NavBar";
import { Suggestions } from "@/components/homePage/Suggestions";
import SuggestionsLoading from "@/components/homePage/SuggestionsLoading";
import type { Metadata } from 'next';
import { Suspense } from "react";

export const metadata: Metadata = {
  
}

export default function Home() {
  return (
    <div className="flex w-full max-w-[1630px]">
      <div className="w-[30%] flex flex-col justify-center items-center gap-3">
        <Logo className="mr-10" />
        <h1 className="text-5xl  font-bold">
          PET SAVING HUB
        </h1>
      </div>
      <div className="w-[70%] bg-[#4B5763] p-5">
        <NavBar />
        <Suspense fallback={<SuggestionsLoading />}>
          <Suggestions />
        </Suspense>
      </div>
    </div>
  );
}
