import axios from "axios";

export const getAvialablePet =() => {
    console.log("getAvialablePet")
    return axios.get("http://localhost:3000/pet/get-apets")
}

export const getCurrentPet = (id) => {

    return axios.get(`http://localhost:3000/pet/${id}`)
}