import { create } from "zustand";
import { getAvialablePet } from "../apis/PetApi";
import { persist,createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";


const usePetStore = create(persist((set,get)=>({
    avaiPets:null ,
   actionGetAvaiPet : async()=>{
    try {
        const resp = await getAvialablePet();
        toast.success(resp)
        set({avaiPets:resp.data})
        return resp.data;
    } catch (err) {
        toast.error("err")
        throw err;
    }
   }
}),{
    name:"pet-store",
    storage: createJSONStorage(()=>localStorage)
}))

export default usePetStore;