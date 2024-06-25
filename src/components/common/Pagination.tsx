import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function Pages({
  currentPage,
  maxPage,
  count = 5,
  className = ""
}: {
  currentPage: string
  maxPage: string
  count?: number
  className?: string
}) {
  const pages = pagination(count)(parseInt(currentPage), parseInt(maxPage))
  return (
    <Pagination className={className}>
      <PaginationContent>
        {
          currentPage != "1" && (
            <PaginationItem>
              <PaginationPrevious href={`?page=${parseInt(currentPage) - 1}`} />
            </PaginationItem>
          )
        }
        {
          pages.map((page, ind) => (
            <PaginationItem key={ind}>
              {
                typeof page === "number" ? (
                  <PaginationLink href={`?page=${page}`} isActive={currentPage === page.toString()}>
                    {page}
                  </PaginationLink>
                ) : (
                  <PaginationEllipsis />
                )
              }
            </PaginationItem>
          ))
        }
        {
          currentPage != maxPage && (
            <PaginationItem>
              <PaginationNext href={`?page=${parseInt(currentPage) + 1}`} />
            </PaginationItem>
          )
        }
      </PaginationContent>
    </Pagination>
  )
}

const {floor, min, max} = Math
const range = (lo: number, hi: number) => Array .from ({length: hi - lo}, (_, i) => i + lo)

const pagination = (count: number, ellipsis = '…') => (page: number, total: number) => {
  const start = max (1, min (page - floor ((count - 3) / 2), total - count + 2))
  const end = min (total, max (page + floor ((count - 2) / 2), count - 1))
  return [
    ... (start > 2 ? [1, ellipsis] : start > 1 ? [1] : []), 
    ... range (start, end + 1), 
    ... (end < total - 1 ? [ellipsis, total] : end < total ? [total] : [])
  ]
}
