import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const DonationDashboard = ({ totalDonationAmount }) => {
  const goals2024 = {
    targetAmount: 500000,
    petsHelped: 250,
    targetPets: 500,
  };

  const impactMetrics = [
    {
      title: "Pets Vaccinated",
      count: Math.floor(totalDonationAmount / 500),
      icon: "💉",
    },
    {
      title: "Pets Fed",
      count: Math.floor(totalDonationAmount / 200),
      icon: "🍖",
    },
    {
      title: "Medical Treatments",
      count: Math.floor(totalDonationAmount / 1000),
      icon: "🏥",
    },
  ];

  const progressPercentage = (totalDonationAmount / goals2024.targetAmount) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>2024 Donation Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <div>Total Donations</div>
                <div>฿{totalDonationAmount.toLocaleString()} / ฿{goals2024.targetAmount.toLocaleString()}</div>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {impactMetrics.map((metric) => (
                <Card key={metric.title}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="text-2xl">{metric.icon}</div>
                      <div>
                        <p className="text-xl font-bold">{metric.count}</p>
                        <p className="text-sm text-muted-foreground">{metric.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
              <p className="text-3xl font-bold mb-2">
                {Math.floor((totalDonationAmount / goals2024.targetAmount) * goals2024.targetPets)}
              </p>
              <p className="text-sm text-muted-foreground">Pets Helped So Far</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-3xl font-bold mb-2">{goals2024.targetPets}</p>
              <p className="text-sm text-muted-foreground">Target Pets for 2024</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationDashboard;
