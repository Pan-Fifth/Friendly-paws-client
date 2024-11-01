import { create } from "zustand";
import { getAvialablePet ,getCurrentPet,createAdoptRequest } from "../apis/PetApi";
import { persist,createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";


const usePetStore = create(persist((set,get)=>({
    avaiPets:null ,
    currentPet:null,
   actionGetAvaiPet : async()=>{
    try {
        const resp = await getAvialablePet();
        toast.success(resp)
        set({avaiPets:resp.data})
        return resp.data;
    } catch (err) {
        toast.error(err)
        throw err;
    }
   },
   actionGetCurrentPet: async(id)=>{
    try {
        console.log("get pet by id")
        const resp = await getCurrentPet(id);
        toast.success(resp)
        set({currentPet:resp.data})
        return resp.data
    } catch (err) {
        toast.error(err)
        throw err;
    }
   },
   actionCreateAdoptRequest: async(data)=>{
    try {
        const resp = await createAdoptRequest(data);
        toast.success(resp)
        return resp.data
    } catch (err) {
        toast.error(err)
        throw err;
    }
   }
}),{
    name:"pet-store",
    storage: createJSONStorage(()=>localStorage)
}))

export default usePetStore;