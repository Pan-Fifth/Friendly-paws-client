import React from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from './../../stores/AuthStore';
import { Button } from "@/components/ui/button"

// export default function Navbar() {

//     const user = useAuthStore((state) => state.user)
//     const actionLogout = useAuthStore((state) => state.actionLogout);



//     console.log(user)
//     const hdlClickLogout = () => {
//         actionLogout();
//     };

//     return (
//         <div>
//             <nav className="top-0 left-0 w-full flex justify-between px-4 md:px-8 h-24 items-center bg-red-500 fixed z-20">

//                 <div className="w-32 h-20 md:flex gap-8 flex items-center ">
//                     <h1 className='text-3xl'>LOGO</h1>
//                 </div>

//                 <div className="hidden md:flex gap-8 text-white">
//                     <Link to="/" className={({isActive}) => 
//           isActive
//             ? ' bg-slate-700 text-white  flex items-center gap-3'
//           : ' hover:bg-slate-100 w-full flex items-center gap-3 '
//           }>HOME</Link>
//                     <Link to="/about" className="font-head">ABOUT</Link>
//                     <Link to="/adopt" className="font-head">ADOPT</Link>
//                     <Link to="/donate" className="font-head">DONATE</Link>
//                     <Link to="/event" className="font-head">EVENT</Link>
//                     <Link to="/contact" className="font-head">CONTACT</Link>
//                 </div>
//                 <div className="hidden md:flex gap-8 text-white">
//                     {user ? (
//                         <div className="flex items-center space-x-4">
//                             {/* วงกลมที่แสดงตัวอักษร */}
//                             <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-white font-bold">
//                                 <span className="text-white">
//                                     {(user?.user?.firstname?.charAt(0).toUpperCase() || user?.user?.role?.charAt(0).toUpperCase())}
//                                 </span>

//                             </div>

//                             <Link onClick={hdlClickLogout} to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
//                                 Logout
//                             </Link>
//                         </div>
//                     )
//                         : (
//                             <div className='flex gap-10'>
//                                 <Link to="/register" className="font-head">register</Link>
//                                 <Link to="/login" className="font-head">login</Link>
//                             </div>
//                         )}

//                 </div>
//             </nav>
//         </div>
//     )
// }


export default function Navbar() {
    const user = useAuthStore((state) => state.user)
    const actionLogout = useAuthStore((state) => state.actionLogout);
        console.log(user)
    const hdlClickLogout = () => {
        actionLogout();
    };

  return (
   
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm  w-full flex  px-4 md:px-8 h-24 items-center ">
      <div className="w-full max-w-7xl mx-auto px-4 ">
        <div className="flex justify-between items-center">
          
          <Link to="/"  className="flex items-center" prefetch={false}>
          {/* ใส่ Logo friendly paws */}
            <MountainIcon className="h-6 w-6" /> 
          </Link>



            <div className='flex justify-between w-1/3 text-xl gap-7'>

            <Link to="/" className="flex items-center transition-colors hover:underline">HOME</Link>
            <Link to="/about" className=" flex items-center transition-colors hover:underline">ABOUT</Link>
            <Link to="/adopt" className=" flex items-center transition-colors hover:underline">ADOPT</Link>
            <Link to="/donate" className=" flex items-center  transition-colors hover:underline">DONATE</Link>
            <Link to="/event" className=" flex items-center  transition-colors hover:underline">EVENT</Link>
            <Link to="/contact" className=" flex items-center  transition-colors hover:underline">CONTACT</Link>

            </div>

         
          <div className="flex items-center gap-4 text-xl">
                     {user ? (
                        <div className="flex items-center space-x-4">
                            {/* วงกลมที่แสดงตัวอักษร */}
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-white font-bold">
                                <span className="text-white">
                                    {(user?.user?.firstname?.charAt(0).toUpperCase() || user?.user?.role?.charAt(0).toUpperCase())}
                                </span>
                            </div>

                            <Link onClick={hdlClickLogout} to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                LOGOUT
                            </Link>
                        </div>
                    )
                        : (
                            <div className='flex gap-10'>
                                <Link to="/register" className="font-head">REGISTER</Link>
                                <Link to="/login" className="font-head">LOGIN</Link>
                            </div>
                        )}

                </div>

        </div>
      </div>
    </nav>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}