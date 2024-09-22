import Logo from "@/components/common/Logo";
import { NavBar } from "@/components/header/NavBar";
import Link from "next/link";

export default function SearchResultsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-fit px-10 py-5 bg-[#4B5763]">
      <div className="flex gap-5 items-center mb-10">
        <Link href="/">
          <Logo width={40} color="white" />
        </Link>
        <NavBar />
      </div>
      {children}
    </div>
  )
}