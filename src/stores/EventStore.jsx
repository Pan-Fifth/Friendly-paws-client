import { create } from "zustand";
import { persist, createJSONStorage }  from "zustand/middleware";
import { toast } from "react-toastify";
import { getEvents, registerEvent } from "../apis/Event.Api";

const useEventStore = create(persist((set)=>({
    
    events: [],
    pastEvent: [],
    regisEvent: [],
    getEvents: async () => {
        try {
            const response = await getEvents();
            set({ events: response.data });
            set({pastEvent: response.data});
            console.log("ขอดู response",response.data)
        }
        catch (error) {
            toast.error("Error fetching events");
        }
    },
    registerEvent: async (token,eventId) => {
        console.log("first", token)
        try {
            const response = await registerEvent(token,eventId);
            toast.success("Event registered successfully");
            set({ regisEvent: response.data });
        } catch (error) {
            toast.error("Error registering event");
        }
    }
}),
{
    name: "event-storage",
    storage: createJSONStorage(() => localStorage)
}
));

export default useEventStore;