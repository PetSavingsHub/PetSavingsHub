"use client"

import * as React from "react"

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { webs } from "@/constants/webs";
import NavMenuItem from "./NavMenuItem";
import { SearchBar } from "../search/SearchBar";

export function NavBar() {
  return (
    <NavigationMenu className="flex justify-between w-full max-w-full">
      <NavigationMenuList>
        {
          webs.map((item) => (
            <NavMenuItem key={item.name} item={item} />
          ))
        }
      </NavigationMenuList>
      <SearchBar />
    </NavigationMenu>
  )
}
