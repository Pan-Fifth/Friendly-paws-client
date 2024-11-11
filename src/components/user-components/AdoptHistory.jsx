import React, { useEffect, useState } from 'react'
import useAuthStore from '@/src/stores/AuthStore'
import { getAdoptHistory } from '@/src/apis/UserHistoryApt'
import { format } from "date-fns"
import { useTranslation } from "react-i18next";



export default function AdoptHistory() {
    const { t, i18n } = useTranslation();
    const language = i18n.language;

    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.token);
    const [adoptHistory, setAdoptHistory] = useState([]);
    const userId = user.user.id;


    useEffect(() => {
        fetchDonateHistory();
    }, [user, token]);
    const fetchDonateHistory = async () => {
        try {
            const response = await getAdoptHistory(token, userId);
            setAdoptHistory(response.data);
        } catch (error) {
            console.error('Error fetching adopt history:', error);
        }
    }
    return (
        <div className="w-full md:w-1/2 mx-auto p-8">
            <h1 className="text-2xl font-bold text-center mb-6">{t("navbar.adoptHistory")}</h1>
            <div className="bg-white rounded-lg shadow-lg p-6">
                {adoptHistory.length > 0 ? (
                    <ul className="space-y-4 max-h-96 overflow-y-auto">
                        {adoptHistory.map((adopt, index) => (
                            <li key={index} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row ">
                                <div className="w-full mb-4 md:mb-0">
                                    <h2 className="text-lg font-semibold text-gray-700">{language === 'th' ? (adopt.pet.name_th || adopt.pet.name_en) : adopt.pet.name_en || adopt.pet.name_th}</h2>
                                    <p className="text-gray-500 text-sm">{t("history.adoptDate")} {new Date(adopt.created_at).toLocaleDateString()}</p>
                                    <p className="text-gray-500 text-sm">{t("history.status")}{adopt.status}</p>
                                    <p className="text-gray-500 text-sm">{t("history.petType")} {adopt.pet.type}</p>
                                    <p className="text-gray-500 text-sm">{t("history.breed")} {language === 'th' ? (adopt.pet.breed_th || adopt.pet.breed_en) : adopt.pet.breed_en || adopt.pet.breed_th}</p>
                                    <p className="text-gray-500 text-sm">{t("history.gender")} {adopt.pet.gender}</p>
                                    <p className="text-gray-500 text-sm">{t("history.color")} {adopt.pet.color}</p>
                                    <p className="text-gray-500 text-sm">{t("history.birthDate")} {format(new Date(adopt.pet.age), 'dd/MM/yyyy ')}</p>
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
