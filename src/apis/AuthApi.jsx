import axios from 'axios'

export const register = (form) => {

    return axios.post("http://localhost:3000/auth/register", form)
}


export const login = (form) => {

    return axios.post("http://localhost:3000/auth/login", form)

}
export const loginGoogle = (token) => {
    return axios.post("http://localhost:3000/auth/login-google", { token }, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
};

export const forgetPassword = (email) => {

    return axios.post("http://localhost:3000/auth/forget-password", { email }, {

        headers: {
            'Content-Type': 'application/json'
        },
    })
}


export const resetPassword = (token, data) => {
    console.log('token :>> ', token);
    return axios.post(`http://localhost:3000/auth/reset-password/${token}`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
