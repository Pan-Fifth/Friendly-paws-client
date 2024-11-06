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
            toast.error("Error fetching events");
        }
    },
    registerEvent: async (token, eventId) => {
        console.log("first", token)
        try {
            const response = await registerEvent(token, eventId);
            toast.success("Event registered successfully");
            set({ regisEvent: response.data });
        } catch (error) {
            toast.error("Cannot register event");
        }
    },
    deleteEvent: async (token, id) => {
        console.log("first", token)
        try {
            const response = await deleteEvent(token, id);
            toast.success("Event delete successfully");
            set({ regisEvent: response.data });
        } catch (error) {
            toast.error("Cannot delete event");
        }
    },
    updateEvent: async (token, eventId, updatedData) => {
        try {
            const response = await updateEvent(token, eventId, updatedData);
            toast.success("Event updated successfully");
            set({ events: response.data });
        } catch (error) {
            toast.error("Cannot updating event");
        }
    }
}),
    {
        name: "event-storage",
        storage: createJSONStorage(() => localStorage)
    }
));

export default useEventStore;