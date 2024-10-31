import axios from "axios";

export const confirmPayment = async (paymentData) => {
    const response = await axios.post('/api/payment/confirm-payment', paymentData);
    return response.data;
};

export const sendPublishKey = () => {

    return axios.get("http://localhost:3000/payment/config")
}

export const createPaymentStripe = (amount) => {

    return axios.post("http://localhost:3000/payment/create-payment-intent", {
        amount: Math.round(amount * 100),
    });
}