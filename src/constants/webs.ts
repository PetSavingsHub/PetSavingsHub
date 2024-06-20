export type menuItem = {
  name: string
  listItem: {
    name: string
    detail: string
    href: string
  }[]
  logo: string
}

export const webs: menuItem[] = [
  {
    name: 'PetSmart',
    listItem: [
      {
        name: 'Deals',
        href: '/petsmart/deals',
        detail: "Check Deals"
      }
    ],
    logo: '/PetSmart.png',
  },
  {
    name: 'Pet Valu',
    listItem: [
      {
        name: 'Deals',
        href: '/petvalu/deals',
        detail: "Check Deals"
      }
    ],
    logo: '/PetValu.png',
  },
  {
    name: 'Chewy',
    listItem: [
      {
        name: 'Deals',
        href: '/chewy/deals',
        detail: "Check Deals"
      }
    ],
    logo: '/Chewy.png',
  },
]
