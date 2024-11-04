

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { useTranslation } from 'react-i18next';


const DonationDashboard = ({ totalDonationAmount, goals }) => {
  // console.log("Data received:",totalDonationAmount, goals)

  const { t } = useTranslation();



  const progressPercentage = (totalDonationAmount / goals.targetAmount) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{new Date().getFullYear()} {t("donationGoals.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>{t("donationGoals.totalDonations")}</span>
                <span>฿{totalDonationAmount.toLocaleString()} / ฿{goals?.targetAmount.toLocaleString()}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("donationGoals.impactSummary")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-3xl font-bold mb-2">{goals.petsHelped}</p>
              <p className="text-sm text-muted-foreground">{t("donationGoals.petsHelped")}</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-3xl font-bold mb-2">{goals.targetPets}</p>
              <p className="text-sm text-muted-foreground">{t("donationGoals.targetPets")} {new Date().getFullYear()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationDashboard;
