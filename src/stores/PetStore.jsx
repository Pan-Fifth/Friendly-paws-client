import { create } from "zustand";
import { getAvialablePet ,getCurrentPet,getAllPet,createPet,editPet,deletePet,createAdoptRequest } from "../apis/PetApi";
import { persist,createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";
import { act } from "react";


const usePetStore = create(persist((set,get)=>({
    allPets : [],
    avaiPets:null,
    currentPet:null,
    filter: {},
    setFilter: (filterObj) => set({ filter: filterObj }),
    actionGetAvaiPet : async(count,page,query)=>{
    try {
        
        const resp = await getAvialablePet(count,page,query);
        
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
   actionCreateAdoptRequest: async(data,token)=>{
    try {
        const resp = await createAdoptRequest(data,token);
        toast.success(resp)
        return resp.data
    } catch (err) {
        toast.error(err)
        throw err;
    }
   },
   actionGetAllPets : async(token) => {
    try {
        const result = await getAllPet(token)
        // console.log(result.data)
        set({allPets:result.data})
        return result.data

    } catch (err) {
        throw err;
    }
   },
   actionCreatePet : async(token,formData)=>{
    try {
        const result = await createPet(token,formData)
        // console.log(result)
        return result.data
    } catch (err) {
        throw err;
    }
   },
   actionEditPet : async(token,id,formData)=>{
    try {
        const result = await editPet(token,id,formData)
        console.log(result)
        return result.data
    } catch (err) {
        throw err;
    }
   },
   actionDeletePet : async(token,id)=>{
    try {
        const result = await deletePet(token,id)
        console.log(result)
        return result.data
    } catch (err) {
        throw err;
    }
   }


}),{
    name:"pet-store",
    storage: createJSONStorage(()=>localStorage)
}))

export default usePetStore;