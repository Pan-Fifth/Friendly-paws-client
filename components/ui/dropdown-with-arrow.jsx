import * as React from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import usePetStore from "@/src/stores/PetStore";

export function DropdownWithArrow({ name, array, className, onChange }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const filter = usePetStore((state) => state.filter);

  const handleSelect = (value) => {
    const event = {
      target: {
        name: name.toLowerCase(),
        value: value,
      },
    };


    onChange(event);
    console.log(filter);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`${className || "w-[200px]"} justify-between`}
        >
          {filter[name] ? filter[name].toLowerCase():name}
          <ChevronDown
            className={`ml-2 h-4 w-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={className || "w-[200px]"}>
        {array.map((el) => (
          <DropdownMenuItem key={el} onClick={() => handleSelect(el)}>
            {el}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
