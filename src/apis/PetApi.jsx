import axiosInstance from "../utils/axiosInstance";

export const getAvialablePet = () => {
    console.log("getAvialablePet")
    return axiosInstance.get("/pet/get-apets")
}

export const getCurrentPet = (id) => {

    return axiosInstance.get(`/pet/${id}`)
}