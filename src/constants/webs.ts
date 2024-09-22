export type menuItem = {
  id: string
  name: string
  listItem: {
    name: string
    detail: string
    href: string
  }[]
  logo: string
  link: string
}

export const webs: menuItem[] = [
  {
    id: "petsmart",
    name: 'PetSmart',
    listItem: [
      {
        name: 'Deals',
        href: '/petsmart/deals',
        detail: "Check Deals"
      }
    ],
    logo: '/PetSmart.png',
    link: "https://www.petsmart.ca/"
  },
  {
    id: "petvalu",
    name: 'Pet Valu',
    listItem: [
      {
        name: 'Deals',
        href: '/petvalu/deals',
        detail: "Check Deals"
      }
    ],
    logo: '/PetValu.png',
    link: "https://www.petvalu.ca/"
  },
  {
    id: "chewy",
    name: 'Chewy',
    listItem: [
      {
        name: 'Deals',
        href: '/chewy/deals',
        detail: "Check Deals"
      }
    ],
    logo: '/Chewy.png',
    link: "https://www.chewy.com/ca"
  },
  {
    id: "renspets",
    name: "Ren's Pets",
    listItem: [
      {
        name: 'Deals',
        href: '/renspets/deals',
        detail: "Check Deals"
      }
    ],
    logo: '/RensPet.png',
    link: "https://www.renspets.com/"
  },
]
