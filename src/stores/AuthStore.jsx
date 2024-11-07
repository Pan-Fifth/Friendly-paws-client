
import { create } from "zustand";
import { register, login, loginGoogle } from "../apis/AuthApi";
import { persist, createJSONStorage } from "zustand/middleware";



const useAuthStore = create(persist((set, get) => ({

    user: null,
    token: null,
    isOpen: false,
    setIsOpen: (open) => set({ isOpen: open }),

    actionRegister: async (form) => {

        try {

            const resp = await register(form);
            return resp.data;
        } catch (err) {

            throw err;
        }
    },
    actionLogin: async (form) => {

        try {
            const resp = await login(form)

            set({

                user: resp.data.user,
                token: resp.data.token
            })

            return resp
        } catch (err) {
            throw err;
        }
    },
    actionLogout: () => {

        localStorage.clear()
        set({
            user: null,
            token: null
        })
    },

    actionLoginGoogle: async (token) => {
        try {
            const result = await loginGoogle(token);
            if (result.data && result.data.token) {
                set({
                    user: result.data.user,
                    token: result.data.token
                });

                return result.data.user.user.role;
            } else {
                throw new Error("Login failed or token not received.");
            }
        } catch (err) {
            console.error("Error during Google login:", err);

        }
    },

}), {

    name: "auth-store",
    storage: createJSONStorage(() => localStorage)
}))

export default useAuthStore



