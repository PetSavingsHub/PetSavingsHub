"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaRegQuestionCircle } from "react-icons/fa";
import { BsDot } from "react-icons/bs";

export default function PriceTooltip({tips}: {tips: string[]}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center gap-1 text-rose-700 text-[11px]">
            <span>Is this a deal</span>
            <FaRegQuestionCircle />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div>
            {
              tips.map((tip, index) => (
              <p key={index} className="text-xs text-slate-200 flex gap-1 items-center">
                <BsDot />
                <span>{tip}</span>
              </p>
            ))
            }
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
