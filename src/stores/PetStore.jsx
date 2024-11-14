import { create } from "zustand";
import { getAvialablePet, getCurrentPet, getAllPet, createPet, editPet, deletePet, createAdoptRequest } from "../apis/PetApi";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";
import { act } from "react";


const usePetStore = create(persist((set, get) => ({
    allPets: [],
    avaiPets: null,
    currentPet: null,
    filter: {},
    setFilter: (filterObj) => set({ filter: filterObj }),
    actionGetAvaiPet: async (count, page, query) => {
        try {

            const resp = await getAvialablePet(count, page, query);

            toast.success(resp)
            set({ avaiPets: resp.data })
            return resp.data;
        } catch (err) {
            toast.error(err)
            throw err;
        }
    },
    actionGetCurrentPet: async (id) => {
        try {

            const resp = await getCurrentPet(id);
            toast.success(resp)
            set({ currentPet: resp.data })
            return resp.data
        } catch (err) {
            toast.error(err)
            throw err;
        }
    },
    actionCreateAdoptRequest: async (data, token) => {
        try {
            const resp = await createAdoptRequest(data, token);
            toast.success(resp)
            return resp.data
        } catch (err) {
            toast.error(err)
            throw err;
        }
    },
    actionGetAllPets: async (token,page) => {
        try {
            const result = await getAllPet(token,page)
            // console.log(result.data)
            set({ allPets: result.data })
            return result.data

        } catch (err) {
            throw err;
        }
    },

    actionCreatePet: async (token, formData) => {
        try {
            const result = await createPet(token, formData)
            // console.log(result)
            return result.data
        } catch (err) {
            throw err;
        }
    },
    actionEditPet: async (token, id, formData) => {
        try {
            const result = await editPet(token, id, formData)
            console.log(result)
            return result.data
        } catch (err) {
            throw err;
        }
    },
    actionDeletePet: async (token, id) => {
        try {
            const result = await deletePet(token, id)
            console.log(result)
            return result.data
        } catch (err) {
            throw err;
        }
    }, adoptFormData: {
        firstname: '',
        lastname: '',
        dateOfBirth: '',
        phone: '',
        socialContact: '',
        address: '',
        career: '',
        workPlace: '',
        workTime: '',
        dayOff: '',
        salary: '',
        familyMemberCount: '',
        familyAlwaysHome: '',
        aloneHours: '',
        housingType: '',
        houseCheck: {
            hasGarden: false,
            hasFence: false,
            canWalkDog: false
        },
        currentPetCount: '',
        currentPetDetails: '',
        deliveryType: '',
        why: '',
        files: []
    },

    // Add new actions
    updateAdoptFormData: (data) => set((state) => ({
        adoptFormData: {
            ...state.adoptFormData,
            ...data
        }
    })),

    clearAdoptFormData: () => set({
        adoptFormData: {
            firstname: '',
            lastname: '',
            dateOfBirth: '',
            phone: '',
            socialContact: '',
            address: '',
            career: '',
            workPlace: '',
            workTime: '',
            dayOff: '',
            salary: '',
            familyMemberCount: '',
            familyAlwaysHome: '',
            aloneHours: '',
            housingType: '',
            houseCheck: {
                hasGarden: false,
                hasFence: false,
                canWalkDog: false
            },
            currentPetCount: '',
            currentPetDetails: '',
            deliveryType: '',
            why: '',
            files: []
        }
    }),



}), {
    name: "pet-store",
    storage: createJSONStorage(() => localStorage)
}))

export default usePetStore;