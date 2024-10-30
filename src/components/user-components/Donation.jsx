import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from 'react-type-animation'; //newly installed
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import useAuthStore from "@/src/stores/AuthStore";
import DonationDashboard from "./DonationDashboard";

const Donation = () => {
  const { user, token } = useAuthStore();
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CREDIT");
  const [isRecurring, setIsRecurring] = useState(false);
  const [totalDonationAmount, setTotalDonationAmount] = useState(0);
  const { toast } = useToast();

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
    try {
      const response = await axios.get(`http://localhost:3000/user/donate`);
      if (response.data.success) {
        // console.log(response.data.data);
        setTotalDonationAmount(response.data.data.totalAmount);
      }
    } catch (error) {
      console.error("Error getting donation amount:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
      });
    }
  };

  useEffect(() => {
    getTotalDonationAmount();
  }, []);

  const handleAmountSelect = (selectedAmount) => {
    setAmount(selectedAmount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setAmount(e.target.value);
  };

  const handleDonation = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/user/donate`,
        {
          userId: user?.user?.id,
          total: parseFloat(amount),
          payment_method: paymentMethod,
          transaction_id: `TR${Date.now()}`,
          is_recurring: isRecurring,
          receipt_url: "placeholder_url",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast({
          title: "Success!",
          description: "Thank you for your donation!",
        });
        setAmount("");
        setCustomAmount("");
      }
    } catch (error) {
      console.error("Error making donation:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gradient-to-b from-background/50 to-muted/50">
      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Hero Section - Left */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center space-y-6"
        >
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Make a Difference Today
          </h1>
          <TypeAnimation
            sequence={[
              'Your compassion could be a game changer.',
              2000,
              'Every donation makes a difference.',
              2000,
              'Help us give them a better life.',
              2000,
            ]}
            repeat={Infinity}
            className="text-2xl text-muted-foreground"
          />
          <p className="text-muted-foreground text-lg">
            Join us in making a difference in the lives of animals in need. Your support helps provide food, shelter, and medical care.
          </p>
        </motion.div>
  
        {/* Donation Form - Right */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
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
                      variant={amount === option.amount ? "default" : "outline"}
                      className="h-24 w-full flex flex-col items-center justify-center text-center p-2 transition-all"
                      onClick={() => handleAmountSelect(option.amount)}
                    >
                      <span className="text-2xl mb-1">{option.icon}</span>
                      <span className="font-bold">฿{option.amount}</span>
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
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="transition-all focus:ring-2 focus:ring-primary"
                />
              </div>
  
              {amount && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-muted p-4 rounded-lg border border-border/50"
                >
                  <p className="font-semibold">Your Impact:</p>
                  {donationOptions.find((opt) => opt.amount === Number(amount))?.benefit ||
                    "Your generous donation will help support our animal welfare programs"}
                </motion.div>
              )}
  
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="CREDIT" id="CREDIT" />
                    <Label htmlFor="CREDIT">Credit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="PROMPTPAY" id="PROMPTPAY" />
                    <Label htmlFor="PROMPTPAY">Bank Transfer</Label>
                  </div>
                </RadioGroup>
              </div>
  
              <div className="flex items-center space-x-2">
                <Switch 
                  id="recurring" 
                  checked={isRecurring} 
                  onCheckedChange={setIsRecurring}
                  className="data-[state=checked]:bg-primary"
                />
                <Label htmlFor="recurring">Make this a monthly donation</Label>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all"
                onClick={handleDonation} 
                disabled={!amount || amount <= 0}
              >
                Donate ฿{amount || 0}
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
    </div>
  );
  
};

export default Donation;
