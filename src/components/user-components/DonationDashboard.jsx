import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { HeartHandshake, PawPrint, Target } from "lucide-react";
import { useTranslation } from 'react-i18next';

const DonationDashboard = ({ totalDonationAmount, goals }) => {
  const { t } = useTranslation();
  const progressPercentage = (totalDonationAmount / goals?.targetAmount || 1) * 100;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="space-y-8 p-4 max-w-4xl mx-auto">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card className="backdrop-blur-md bg-white/90 border-2 border-pink-100 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold flex items-center gap-2 text-pink-600">
              <Target className="w-6 h-6" />
              {new Date().getFullYear()} {t("donationGoals.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-lg font-medium">{t("donationGoals.totalDonations")}</span>
                  <span className="text-lg font-bold text-pink-600">
                    ฿{totalDonationAmount?.toLocaleString() ?? 0} / ฿{goals?.targetAmount?.toLocaleString() ?? 0}
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-3 bg-pink-100" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card className="backdrop-blur-md bg-white/90 border-2 border-pink-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2 text-pink-600">
              <HeartHandshake className="w-6 h-6" />
              {t("donationGoals.impactSummary")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl border border-pink-100 shadow-sm">
                <div className="flex flex-col items-center">
                  <PawPrint className="w-8 h-8 text-pink-500 mb-2" />
                  <p className="text-4xl font-bold text-pink-600 mb-2">{goals?.petsHelped ?? 0}</p>
                  <p className="text-sm text-gray-600 text-center">{t("donationGoals.petsHelped")}</p>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl border border-pink-100 shadow-sm">
                <div className="flex flex-col items-center">
                  <Target className="w-8 h-8 text-pink-500 mb-2" />
                  <p className="text-4xl font-bold text-pink-600 mb-2">{goals?.targetPets ?? 0}</p>
                  <p className="text-sm text-gray-600 text-center">{t("donationGoals.targetPets")} {new Date().getFullYear()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DonationDashboard;
