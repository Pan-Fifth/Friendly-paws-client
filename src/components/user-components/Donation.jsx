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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import useDonationStore from "@/src/stores/DonationStore";
import DonationDashboard from "./DonationDashboard";
import LiveChat from "./LiveChat";
import ChatPortal from "./ChatPortal";
import PaymentDonate from "./PaymentDonate";

const Donation = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    donation,
    showPaymentDialog,
    totalDonationAmount,
    setTotal,
    setIsRecurring,
    setShowPaymentDialog,
    setTotalDonationAmount,
    reset
  } = useDonationStore();
  const donationOptions = [
    {
      amount: 200,
      benefit: "Provides food for 2 pets for a week",
      icon: "🐱",
    },
    {
      amount: 500,
      benefit: "Covers basic veterinary check-up for 1 pet",
      icon: "💉",
    },
    {
      amount: 1000,
      benefit: "Supports vaccination and medicine for 2 pets",
      icon: "🏥",
    },
  ];

  const getTotalDonationAmount = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/user/donate`);
      if (response.data.success) {
        setTotalDonationAmount(response.data.data.totalAmount);
      }
    } catch (error) {
      console.error("Error getting donation amount:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTotalDonationAmount();
  }, []);

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  const handleAmountSelect = (selectedAmount) => {
    setTotal(Number(selectedAmount)); // Ensure it's a number
  };
  

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setTotal(Number(value));
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gradient-to-b from-background/50 to-muted/50">
      <ChatPortal>
        <LiveChat ref={React.createRef()} className="fixed top-0 right-0" />
      </ChatPortal>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Hero Section - Left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center space-y-6"
        >
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 py-4">
            Make a Difference Today
          </h1>
          <TypeAnimation
            sequence={[
              "Your compassion could be a game changer.",
              1500,
              "Every donation makes a difference.",
              1500,
              "Help us give them a better life.",
              1500,
            ]}
            speed={50}
            omitDeletionAnimation={true}
            repeat={Infinity}
            className="text-2xl text-muted-foreground"
          />
          <p className="text-muted-foreground text-lg">
            Join us in making a difference in the lives of animals in need. Your support helps
            provide food, shelter, and medical care.
          </p>
        </motion.div>

        {/* Donation Form - Right */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <Card className="backdrop-blur-sm bg-card/95 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Make a Donation</CardTitle>
              <CardDescription>Support our furry friends in need</CardDescription>
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
                <Label htmlFor="custom-amount">Custom Amount (THB)</Label>
                <Input
                  id="custom-amount"
                  type="number"
                  placeholder="Enter custom amount"
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
                  <p className="font-semibold">Your Impact:</p>
                  {donationOptions.find((opt) => opt.amount === donation.total)?.benefit ||
                    "Your generous donation will help support our animal welfare programs"}
                </motion.div>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="recurring"
                  checked={donation.is_recurring}
                  onCheckedChange={setIsRecurring}
                  className="data-[state=checked]:bg-primary"
                />
                <Label htmlFor="recurring">Make this a monthly donation</Label>
              </div>
            </CardContent>

            <CardFooter>
              <Button
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all"
                onClick={() => setShowPaymentDialog(true)}
                disabled={!donation.total || donation.total <= 0}
              >
                Donate ฿{donation.total || 0}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      {/* Goal Section - Bottom Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full mt-8"
      >
        <DonationDashboard totalDonationAmount={totalDonationAmount} />
      </motion.div>
      {showPaymentDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg max-w-md w-full">
            <PaymentDonate amount={donation.total} />
            <Button className="mt-4 w-full" onClick={() => setShowPaymentDialog(false)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donation;
