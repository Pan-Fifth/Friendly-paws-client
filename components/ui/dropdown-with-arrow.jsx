import * as React from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownWithArrow({name,array,className}) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    (<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={`${className||"w-[200px]"} justify-between`}>
          {name}
          <ChevronDown
            className={`ml-2 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={className||"w-[200px]"}>
        {array.map((el)=>(<DropdownMenuItem>{el}</DropdownMenuItem>))}
      </DropdownMenuContent>
    </DropdownMenu>)
  );
}