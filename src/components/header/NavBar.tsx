"use client"

import * as React from "react"

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { webs } from "@/constants/webs";
import NavMenuItem from "./NavMenuItem";

export function NavBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {
          webs.map((item) => (
            <NavMenuItem key={item.name} item={item} />
          ))
        }
      </NavigationMenuList>
    </NavigationMenu>
  )
}
