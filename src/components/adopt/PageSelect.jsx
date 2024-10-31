import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  
  export function PaginationDemo({className}) {
    return (
      <Pagination >
        <PaginationContent >
          <PaginationItem>
            <PaginationLink className={className} href="#" >1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink className={className} href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink className={className} href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
          <PaginationLink className={className} href="#">10</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }
  