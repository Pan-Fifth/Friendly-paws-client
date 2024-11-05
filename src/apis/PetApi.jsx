import axiosInstance from "../utils/axiosInstance";

export const getAvialablePet = (count = 12, page = 1,query) => {
    return axiosInstance.get(`/pet/get-apets/${count}/${page}`,{params:query})
}

export const getCurrentPet = (id) => {

    return axiosInstance.get(`/pet/${id}`)
}

export const getAllPet = (token) => {

    return axiosInstance.get(`/pet`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
export const createPet = (token, body) => {

    return axiosInstance.post(`/pet`, body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
export const editPet = (token, id, body) => {

    return axiosInstance.patch(`/pet/${id}`, body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
export const deletePet = (token, id) => {

    return axiosInstance.delete(`/pet/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export const createAdoptRequest = (data,token) => {
    return axiosInstance.post("/pet/create-adopt",data,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}