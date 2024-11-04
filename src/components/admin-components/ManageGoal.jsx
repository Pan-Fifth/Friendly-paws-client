import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "@/src/utils/axiosInstance";

const ManageGoal = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [formData, setFormData] = useState({
    targetAmount: "",
    targetPets: "",
    petsHelped: "",
  });

  useEffect(() => {
    const fetchCurrentGoal = async () => {
      try {
        const response = await axios.get(`/api/donation-goals?year=${selectedYear}`);
        if (response.data) {
          setFormData({
            targetAmount: response.data.targetAmount?.toString() || "",
            targetPets: response.data.targetPets?.toString() || "",
            petsHelped: response.data.petsHelped?.toString() || "",
          });
        } else {
          setFormData({
            targetAmount: "",
            targetPets: "",
            petsHelped: "",
          });
        }
      } catch (error) {
        toast.error("Failed to fetch goals for selected year");
        setFormData({
          targetAmount: "",
          targetPets: "",
          petsHelped: "",
        });
      }
    };
    fetchCurrentGoal();
  }, [selectedYear]);

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submissionData = {
        targetAmount: parseInt(formData.targetAmount) || 0,
        targetPets: parseInt(formData.targetPets) || 0,
        petsHelped: parseInt(formData.petsHelped) || 0,
      };
      await axiosInstance.put(`/admin/${selectedYear}`, submissionData);
      toast.success("Donation goals updated successfully");
    } catch (error) {
      toast.error("Failed to update donation goals");
    }
  };

  const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Donation Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Select Year</label>
            <select
              value={selectedYear}
              onChange={handleYearChange}
              className="w-full p-2 border rounded-md"
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Target Amount (฿)
            </label>
            <Input
              type="number"
              name="targetAmount"
              value={formData.targetAmount}
              onChange={handleInputChange}
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Target Number of Pets
            </label>
            <Input
              type="number"
              name="targetPets"
              value={formData.targetPets}
              onChange={handleInputChange}
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Current Pets Helped
            </label>
            <Input
              type="number"
              name="petsHelped"
              value={formData.petsHelped}
              onChange={handleInputChange}
              min="0"
            />
          </div>

          <Button type="submit" className="w-full">
            Update Goals for {selectedYear}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ManageGoal;
