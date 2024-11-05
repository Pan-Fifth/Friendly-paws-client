

///เฟมไม่ได้ใช้ค่ะ แต่ขอเก็บไว้ก่อน

// import { Button } from "@/components/ui/button"


// export default function PaginationDemo({
//   currentPage = 1,
//   onPageChange,
//   hasNextPage = true
// }) {
//   return (
//     <div className="flex items-center justify-center space-x-4">
//       <Button
//         variant="outline"
//         size="icon"
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         aria-label="Previous page"
//       >
//        Left
//       </Button>
//       <div className="text-sm font-medium">
//         Page {currentPage}
//       </div>
//       <Button
//         variant="outline"
//         size="icon"
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={!hasNextPage}
//         aria-label="Next page"
//       >
//         Right
//       </Button>
//     </div>
//   )
// }