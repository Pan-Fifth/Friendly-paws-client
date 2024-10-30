import axios from "axios";

export const getAvialablePet =() => {

    return axios.get("http://localhost:3000/pet/get-apets")
}