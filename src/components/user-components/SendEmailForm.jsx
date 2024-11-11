import React, { useState } from 'react';
import useAuthStore from './../../stores/AuthStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendEmailApi } from '../../apis/UserApi';
import { useTranslation } from 'react-i18next';
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";   

export default function SendEmailForm() {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error(t("sendemailForm.loginRequired"));
      return navigate('/login');
    }
    if (user?.user?.role === "ADMIN") {
      toast.error(t("sendemailForm.adminRestriction"));
      return;
    }

    try {
      const response = await sendEmailApi(recipient, subject, message, token);
      if (response.status === 200) {
        setRecipient('');
        setSubject('');
        setMessage('');
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(t("sendemailForm.sendFailed"));
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-[#ffffff]">
      <div className="gap-5 items-center">
        <div className="space-y-4">
          <div className="space-y-2 flex items-center">
            <Mail 
              className="mr-2 text-[#db2777] hover:rotate-12 transition-transform duration-300 transform translate-y-2" 
              style={{ fontSize: '15rem' }} 
            />
            <h2 className="text-3xl font-bold tracking-tight text-[#db2777]">Get in touch</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit}> {/* เพิ่ม onSubmit เพื่อให้ฟอร์มทำงานได้ */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder={t("sendemailForm.recipientPlaceholder")}
                required
                className="text-black w-full px-4 py-2 border border-[#db2777] rounded-md focus:outline-none focus:ring-2 focus:ring-[#db2777]" 
              />
            </div>
            <div className="space-y-2">
              <Input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={t("sendemailForm.subjectPlaceholder")}
                required
                className="text-black w-full px-4 py-2 border border-[#db2777] rounded-md focus:outline-none focus:ring-2 focus:ring-[#db2777]" 
              />
            </div>
            <div className="space-y-2">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("sendemailForm.messagePlaceholder")}
                required
                className="w-full text-black px-4 py-2 border border-[#db2777] rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-[#db2777]" 
              />
            </div>
            <button type="submit" className="w-full bg-[#db2777] text-white font-semibold py-2 rounded-md hover:bg-[#db2777] transition duration-300">
              {t("sendemailForm.sendButton")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
