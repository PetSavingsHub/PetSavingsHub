import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { menuItem } from "@/constants/webs";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function NavMenuItem({
  item
}: {
  item: menuItem
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-transparent text-[#fff] hover:text-[#fff] hover:bg-transparent text-md">
        {item.name}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[450px] lg:grid-cols-[.75fr_1fr]">
          <li className="row-span-1">
            <NavigationMenuLink asChild>
              <a
                className="flex h-full w-full select-none flex-col justify-center items-center from-muted/50 to-muted px-6 no-underline outline-none"
                target="_blank"
                href={item.link}
              >
                <Image src={item.logo} alt={item.name} width={100} height={100} />
              </a>
            </NavigationMenuLink>
          </li>
          {
            item.listItem.map((item, index) => (
              <ListItem 
                key={index}
                href={item.href}
                title={item.name}
              >
                {item.detail}
              </ListItem>
            ))
          }
          
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
