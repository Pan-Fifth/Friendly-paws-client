import React, { useEffect, useState } from 'react'
import useAuthStore from '@/src/stores/AuthStore'
import { getDonateHistory } from '@/src/apis/UserHistoryApt'
import { useTranslation } from "react-i18next";



export default function DonateHistory() {
    const { t, i18n } = useTranslation();
    const language = i18n.language;

    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.token);
    const [donateHistory, setDonateHistory] = useState([]);
    const userId = user.user.id;


    useEffect(() => {
        fetchAdoptHistory();
    }, [user, token]);
    const fetchAdoptHistory = async () => {
        try {
            const response = await getDonateHistory(token, userId);
            setDonateHistory(response.data);
        } catch (error) {
            console.error('Error fetching adopt history:', error);
        }
    }
    return (
        <div className="w-full md:w-1/2 mx-auto p-8">
            <h1 className="text-2xl font-bold text-center mb-6">{t("navbar.donateHistory")}</h1>
            <div className="bg-white rounded-lg shadow-lg p-6">
                {donateHistory.length > 0 ? (
                    <ul className="space-y-4 max-h-96 overflow-y-auto">
                        {donateHistory.map((donate, index) => (
                            <li key={index} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row ">
                                <div className="w-full mb-4 md:mb-0">
                                    <p className="text-gray-500 text-sm">{t("history.donationDate")} {new Date(donate.created_at).toLocaleDateString()}</p>
                                    <p className="text-gray-500 text-sm">{t("history.status")} {donate.status}</p>
                                    <p className="text-gray-500 text-sm">{t("history.donationAmount")} {donate.total}</p>
                                    <p className="text-gray-500 text-sm">{t("history.receipt")} {donate.receipt_url}</p>
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
