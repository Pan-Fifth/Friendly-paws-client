
import { create } from "zustand";
import { register, login } from "../apis/AuthApi";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from 'react-toastify';


const useAuthStore = create(persist((set, get) => ({

    user: null,
    token: null,
    isOpen: false,
    setIsOpen: (open) => set({ isOpen: open }),

    actionRegister: async (form) => {

        try {

            const resp = await register(form);
            toast.success(resp.data.message || "Register success");
            return resp.data;
        } catch (err) {
            toast.error(err.response.data.message);
            throw err;
        }
    },
    actionLogin: async (form) => {

        try {
            const resp = await login(form)
            console.log(resp)
            set({

                user: resp.data.user,
                token: resp.data.token
            })

            toast.success(`Welcome ${resp.data.user.user.role}`)
            return resp
        } catch (err) {
            toast.error(err.response.data.message);

        }
    },
    actionLogout: () => {

        localStorage.clear()
        set({
            user: null,
            token: null
        })
    }
}), {

    name: "auth-store",
    storage: createJSONStorage(() => localStorage)
}))

export default useAuthStore



