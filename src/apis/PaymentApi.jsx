import axiosInstance from "../utils/axiosInstance";

export const confirmPayment = (paymentData) => {
    return axiosInstance.post('/payment/confirm-payment', paymentData);
};


export const sendPublishKey = () => {

    return axiosInstance.get("/payment/config")
}

export const createPaymentStripe = (amount) => {

    return axiosInstance.post("/payment/create-payment-intent", {
        amount: Math.round(amount * 100),
    });
}