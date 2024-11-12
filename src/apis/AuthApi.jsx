import axiosInstance from "../utils/axiosInstance";

export const register = (form) => {

    return axiosInstance.post("/auth/register", form)
}


export const login = (form) => {

    return axiosInstance.post("/auth/login", form)

}
export const loginGoogle = (token) => {
    return axiosInstance.post("/auth/login-google", { token }, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
};
export const loginFacebook = (accessToken, userID) => {
    return axiosInstance.post("/auth/login-facebook", { accessToken, userID }, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
};

export const forgetPassword = (email) => {

    return axiosInstance.post("/auth/forget-password", { email }, {

        headers: {
            'Content-Type': 'application/json'
        },
    })
}


export const resetPassword = (token, data) => {

    return axiosInstance.post(`/auth/reset-password/${token}`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
