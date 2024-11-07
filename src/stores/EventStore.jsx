import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";
import { getEvents, registerEvent, deleteEvent, updateEvent } from "../apis/Event.Api";

const useEventStore = create(persist((set) => ({

    events: [],
    pastEvent: [],
    regisEvent: [],
    getEvents: async () => {
        try {
            const response = await getEvents();
            set({ events: response.data });
            set({ pastEvent: response.data });

        }
        catch (error) {
            console.log(error)
        }
    },
    registerEvent: async (token, eventId) => {
        console.log("first", token)
        try {
            const response = await registerEvent(token, eventId);
            set({ regisEvent: response.data });
        } catch (error) {
            console.log(error)
        }
    },
    deleteEvent: async (token, id) => {
        console.log("first", token)
        try {
            const response = await deleteEvent(token, id);
            toast.success("ลบกิจกรรมสำเร็จ");
            set({ regisEvent: response.data });
        } catch (error) {
            console.log(error)
        }
    },
    updateEvent: async (token, eventId, updatedData) => {
        try {
            const response = await updateEvent(token, eventId, updatedData);
            toast.success("แก้ไขกิจกรรมสำเร็จ");
            set({ events: response.data });
        } catch (error) {
            console.log(error)
        }
    }
}),
    {
        name: "event-storage",
        storage: createJSONStorage(() => localStorage)
    }
));

export default useEventStore;