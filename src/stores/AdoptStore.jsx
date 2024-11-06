import { create } from "zustand";
import { persist,createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";
import {getAllAdoptRequest} from "../apis/AdminReportApi"

const useAdoptStore = create(persist((set,get)=>({
    allAdoptRequest : null,
    actionGetAllAdoptRequest : async(token,page)=>{
        try {
            const result = await getAllAdoptRequest(token,page);
            set({allAdoptRequest:result.data})
        } catch (err) {
            toast.error(err.response.data.message)
            throw(err)
        }
    }
}),{
    name: "adopt-store",
    storage:createJSONStorage(()=>localStorage)
})); 

export default useAdoptStore;