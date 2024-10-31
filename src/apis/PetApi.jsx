import axios from "axios";

export const getAvialablePet =() => {

    return axios.get("http://localhost:3000/pet/get-apets")
}

export const getCurrentPet =(id) => {

    return axios.get(`http://localhost:3000/pet/${id}`)
}