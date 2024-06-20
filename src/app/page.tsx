import Logo from "@/components/common/Logo";
import { NavBar } from "@/components/header/NavBar";

export default function Home() {
  return (
    <div className="flex w-full max-w-[1336px]">
      <div className="w-[50%] flex flex-col justify-center items-center gap-3">
        <Logo className="mr-10" />
        <h1 className="text-5xl  font-bold">
          PET SAVING HUB
        </h1>
      </div>
      <div className="w-[50%] bg-[#4B5763] p-5">
        <NavBar />
      </div>
    </div>
  );
}
