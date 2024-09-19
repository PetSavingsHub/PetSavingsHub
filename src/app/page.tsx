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
    <div className="flex h-full">
      <div className="w-[30%] flex flex-col justify-center items-center gap-3">
        <Logo className="mr-10" />
        <h1 className="text-5xl font-bold">
          PET SAVING HUB
        </h1>
      </div>
      <div className="w-[70%] bg-[#4B5763] p-5 h-fit">
        <NavBar />
        <div className="flex justify-center items-center mt-10 mb-6 text-4xl w-full text-orange-600 font-bold">Top Suggestions</div>
        {
          ["PetSmart","PetValu", "Chewy", "RensPets"].map(web => <WebSuggestion key={web} web={web} />)
        }
      </div>
    </div>
  );
}

function WebSuggestion({ web }: { web: string }) {
  return (
    <>
      <h1 className="text-xl text-white mt-4">{web}</h1>
      <Suspense fallback={<SuggestionsLoading />}>
        <Suggestions web={web.toLowerCase()} />
      </Suspense>
    </>
  );
}
