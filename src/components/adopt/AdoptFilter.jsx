// 'use client'

// import { useState } from 'react'
// import { ChevronDown } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Label } from "@/components/ui/label"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"

// export default function FilterByType() {
//   const [open, setOpen] = useState(false)
//   const [selectedFilters, setSelectedFilters] = useState({
//     chat: false,
//     education: true,
//     finance: true,
//     healthcare: false,
//     meetings: true,
//     webinar: true,
//   })

//   const filterTypes = [
//     { id: 'chat', label: 'Chat' },
//     { id: 'education', label: 'Education' },
//     { id: 'finance', label: 'Finance' },
//     { id: 'healthcare', label: 'Healthcare' },
//     { id: 'meetings', label: 'Meetings' },
//     { id: 'webinar', label: 'Webinar' },
//   ]

//   const handleFilterChange = (id) => {
//     setSelectedFilters(prev => ({ ...prev, [id]: !prev[id] }))
//   }

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button 
//           variant="outline" 
//           className="w-[200px] justify-between text-left font-normal"
//         >
//           Gender
//           <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-[200px] p-0" align="start">
//         <div className="p-2 space-y-2">
//           {filterTypes.map((type) => (
//             <div key={type.id} className="flex items-center space-x-2">
//               <Checkbox
//                 id={type.id}
//                 checked={selectedFilters[type.id]}
//                 onCheckedChange={() => handleFilterChange(type.id)}
//               />
//               <Label 
//                 htmlFor={type.id} 
//                 className="text-sm font-normal cursor-pointer"
//               >
//                 {type.label}
//               </Label>
//             </div>
//           ))}
//         </div>
//       </PopoverContent>
//     </Popover>
//   )
// }
