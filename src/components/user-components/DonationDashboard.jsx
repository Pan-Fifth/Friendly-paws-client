

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { t } from "i18next";

const DonationDashboard = ({ totalDonationAmount, goals }) => {
  // console.log("Data received:",totalDonationAmount, goals)
  


  const progressPercentage = (totalDonationAmount / goals?.targetAmount ?? 1) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{new Date().getFullYear()} Donation Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Total Donations</span>
                <span>฿{totalDonationAmount?.toLocaleString() ?? 0} / ฿{goals?.targetAmount?.toLocaleString() ?? 0}</span>
                </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Impact Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-3xl font-bold mb-2">{goals?.petsHelped ?? 0}</p>
              <p className="text-sm text-muted-foreground">Pets Helped So Far</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-3xl font-bold mb-2">{goals?.targetPets ?? 0}</p>
              <p className="text-sm text-muted-foreground">Target Pets for {new Date().getFullYear()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationDashboard;
