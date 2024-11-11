import React, { useEffect, useState } from 'react'
import useAuthStore from '@/src/stores/AuthStore'
import { getEventHistory } from '@/src/apis/UserHistoryApt'
import { format } from "date-fns"
import { useTranslation } from "react-i18next";



export default function EventHistory() {
    const { t, i18n } = useTranslation();
    const language = i18n.language;

    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.token);
    const [eventHistory, setEventHistory] = useState([]);
    const userId = user.user.id;


    useEffect(() => {
        fetchEventHistory();
    }, [user, token]);
    const fetchEventHistory = async () => {
        try {
            const response = await getEventHistory(token, userId);
            console.log(response.data, "response.data.event")
            setEventHistory(response.data);
        } catch (error) {
            console.error('Error fetching adopt history:', error);
        }
    }
    return (
        <div className="w-full md:w-1/2 mx-auto p-8">
            <h1 className="text-2xl font-bold text-center mb-6">{t("navbar.eventHistory")}</h1>
            <div className="bg-white rounded-lg shadow-lg p-6">
                {eventHistory.length > 0 ? (
                    <ul className="space-y-4 max-h-96 overflow-y-auto">
                        {eventHistory.map((event, index) => (
                            <li key={index} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row ">
                                <div className="w-full mb-4 md:mb-0">
                                    <h2 className="text-lg font-semibold text-gray-700">{language === 'th' ? (event.event.title_th || event.event.title_en) : event.event.title_en || event.event.title_th}</h2>
                                    <p className="text-gray-500 text-sm">{t("history.startDate")} {new Date(event.event.date_start).toLocaleDateString()}</p>
                                    <p className="text-gray-500 text-sm">{t("history.endDate")} {new Date(event.event.date_end).toLocaleDateString()}</p>
                                    <p className="text-gray-500 whitespace-pre-line text-sm">{t("history.description")} {language === 'th' ? (event.event.description_th || event.event.description_en) : event.event.description_en || event.event.description_th}</p>
                                    <p className="text-gray-500 text-sm">{t("history.location")} {event.event.location}</p>
                                    <p className="text-gray-500 text-sm">{t("history.status")} {event.event.status}</p>

                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">{t("history.noEventHistory")}</p>
                )}
            </div>
        </div>
    )
}
