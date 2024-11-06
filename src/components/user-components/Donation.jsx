import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import useDonationStore from "@/src/stores/DonationStore";
import DonationDashboard from "./DonationDashboard";
import LiveChat from "./LiveChat";
import ChatPortal from "./ChatPortal";
import PaymentDonate from "./PaymentDonate";
import axiosInstance from "@/src/utils/axiosInstance";
import { useTranslation } from 'react-i18next';

const Donation = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [pageContent, setPageContent] = useState(null);
  const [goals, setGoals] = useState({
    targetAmount: 0,
    petsHelped: 0,
    targetPets: 0,
  });

  const {
    donation,
    showPaymentDialog,
    totalDonationAmount,
    setTotal,
    setShowPaymentDialog,
    setTotalDonationAmount,
    reset
  } = useDonationStore();

  // Fetch page content
  const fetchContent = async () => {
    try {
      const response = await axiosInstance.get('/admin/donation-content');
      setPageContent(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load page content"
      });
    }
  };

  const getTotalDonationAmount = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/user/donate`);
      if (response.data.success) {
        setTotalDonationAmount(response.data.data.totalAmount);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch donation amount"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGoals = async () => {
    const currentYear = new Date().getFullYear();
    const response = await axiosInstance.get(`/admin/?year=${currentYear}`);
    setGoals(response.data);
  };

  useEffect(() => {
    fetchContent();
    getTotalDonationAmount();
    fetchGoals();
    return () => reset();
  }, []);

  const handleAmountSelect = (selectedAmount) => {
    setTotal(Number(selectedAmount));
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setTotal(Number(value));
    }
  };

  if (!pageContent) return null;

  const content = {
    title: currentLanguage === 'en' ? pageContent.title_en : pageContent.title_th,
    description: currentLanguage === 'en' ? pageContent.description_en : pageContent.description_th,
    typingMessages: currentLanguage === 'en' ? 
      pageContent.typing_en.split('|') : 
      pageContent.typing_th.split('|'),
    formTitle: currentLanguage === 'en' ? pageContent.form_title_en : pageContent.form_title_th,
    formDesc: currentLanguage === 'en' ? pageContent.form_desc_en : pageContent.form_desc_th,
    customAmount: currentLanguage === 'en' ? pageContent.custom_amount_en : pageContent.custom_amount_th,
    impactMessage: currentLanguage === 'en' ? pageContent.impact_message_en : pageContent.impact_message_th,
    donateButton: currentLanguage === 'en' ? pageContent.donate_button_en : pageContent.donate_button_th,
    closeButton: currentLanguage === 'en' ? pageContent.close_button_en : pageContent.close_button_th,
  };

  const donationOptions = JSON.parse(pageContent.donation_options);

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gradient-to-b from-background/50 to-muted/50">
      <ChatPortal>
        <LiveChat ref={React.createRef()} className="fixed top-0 right-0" />
      </ChatPortal>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center space-y-6"
        >
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 py-4">
            {content.title}
          </h1>
          <TypeAnimation
            sequence={[
              content.typingMessages[0],
              1500,
              content.typingMessages[1],
              1500,
              content.typingMessages[2],
              1500,
            ]}
            speed={50}
            omitDeletionAnimation={true}
            repeat={Infinity}
            className="text-2xl text-muted-foreground"
          />
          <p className="text-muted-foreground text-lg">
            {content.description}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <Card className="backdrop-blur-sm bg-card/95 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">{content.formTitle}</CardTitle>
              <CardDescription>{content.formDesc}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <motion.div
                className="grid grid-cols-3 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {donationOptions.map((option) => (
                  <motion.div
                    key={option.amount}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={donation.total === option.amount ? "default" : "outline"}
                      className="h-24 w-full flex flex-col items-center justify-center text-center p-2 transition-all"
                      onClick={() => handleAmountSelect(option.amount)}
                    >
                      <div className="text-2xl mb-1">{option.icon}</div>
                      <div className="font-bold">฿{option.amount}</div>
                    </Button>
                  </motion.div>
                ))}
              </motion.div>

              <div className="space-y-2">
                <Label htmlFor="custom-amount">{content.customAmount}</Label>
                <Input
                  id="custom-amount"
                  type="number"
                  value={donation.total || ''}
                  onChange={handleCustomAmountChange}
                  className="transition-all focus:ring-2 focus:ring-primary"
                />
              </div>

              {donation.total > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-muted p-4 rounded-lg border border-border/50"
                >
                  <p className="font-semibold">{content.impactMessage}</p>
                  {donationOptions.find((opt) => opt.amount === donation.total)?.benefit}
                </motion.div>
              )}
            </CardContent>

            <CardFooter>
              <Button
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all"
                onClick={() => setShowPaymentDialog(true)}
                disabled={!donation.total || donation.total <= 0}
              >
                {content.donateButton} ฿{donation.total || 0}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full mt-8"
      >
        <DonationDashboard totalDonationAmount={totalDonationAmount} goals={goals} />
      </motion.div>

      {showPaymentDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg max-w-md w-full">
            <PaymentDonate amount={donation.total} />
            <Button className="mt-4 w-full" onClick={() => setShowPaymentDialog(false)}>
              {content.closeButton}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donation;
