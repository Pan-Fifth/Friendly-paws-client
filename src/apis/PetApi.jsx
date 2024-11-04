import axios from "axios";

export const getAvialablePet =() => {
    console.log("getAvialablePet")
    return axios.get("http://localhost:3000/pet/get-apets")
}

export const getCurrentPet = (id) => {

    return axios.get(`http://localhost:3000/pet/${id}`)
}

export const getAllPet = (token) => {

    return axios.get(`http://localhost:3000/pet`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
export const createPet = (token, body) => {

    return axios.post(`http://localhost:3000/pet`, body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
export const editPet = (token,id, body) => {

    return axios.patch(`http://localhost:3000/pet/${id}`, body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
export const deletePet = (token,id) => {

    return axios.delete(`http://localhost:3000/pet/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

