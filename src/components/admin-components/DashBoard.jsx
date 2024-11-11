import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import DonationDashboard from "../user-components/DonationDashboard";
import axiosInstance from "@/src/utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const STATUS_COLORS = {
  AVAILABLE: "#22c55e",
  PENDING: "#f59e0b",
  ADOPTED: "#3b82f6",
  FOSTERED: "#8b5cf6",
  UNAVAILABLE: "#ef4444",
};

const STATUS_TRANSLATIONS = {
  AVAILABLE: "พร้อมหาบ้าน",
  PENDING: "กำลังดำเนินการ",
  ADOPTED: "ถูกรับเลี้ยงแล้ว",
  FOSTERED: "อยู่ระหว่างการเลี้ยงดู",
  UNAVAILABLE: "ไม่พร้อมหาบ้าน"
};

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [goals, setGoals] = useState({
    targetAmount: 0,
    petsHelped: 0,
    targetPets: 0,
  });
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);

  const handleDonationClick = () => {
    setTimeout(() => {
      setClickCount((prev) => {
        console.log(prev);
        if (prev + 1 === 7) {
          navigate("/admin/manage-goal");
          return 0;
        }
        return prev + 1;
      });
    }, 3000);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      i18n.changeLanguage("th");
      try {
        const response = await axiosInstance.get("/admin/dashboard");
        setDashboardData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };
    fetchDashboardData();

    const fetchGoals = async () => {
      const currentYear = new Date().getFullYear();
      const response = await axiosInstance.get(`/admin/?year=${currentYear}`);
      setGoals(response.data);
    };
    fetchGoals();
  }, []);

  console.log("Data", dashboardData, goals);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 ">
        <div onClick={handleDonationClick}>
          <DonationDashboard
            totalDonationAmount={dashboardData?.overview.ytdDonationsAmount}
            goals={goals}
          />
        </div>
        <Card className="shadow-md hover:shadow-lg transition-shadow flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl">ภาพรวมระบบ</CardTitle>
            <CardDescription>ข้อมูลสำคัญและกิจกรรมล่าสุด</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col flex-1">
            {/* Stats Section */}
            <div className="text-center">
              <p className="text-sm text-gray-500">จำนวนผู้ใช้ทั้งหมด</p>
              <p className="text-3xl font-bold text-primary">{dashboardData.overview.totalUsers}</p>
            </div>
            <div className="text-center border-x">
              <p className="text-sm text-gray-500">จำนวนสัตว์เลี้ยงทั้งหมด</p>
              <p className="text-3xl font-bold text-primary">{dashboardData.overview.totalPets}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">จำนวนการรับเลี้ยงทั้งหมด</p>
              <p className="text-3xl font-bold text-primary">
                {dashboardData.overview.totalAdoptions}
              </p>
            </div>

            {/* Recent Activities Section */}
            <div className="flex-1 overflow-hidden">
              <h3 className="text-lg font-semibold my-4">กิจกรรมล่าสุด</h3>
              <div className="space-y-4 overflow-y-auto h-[220px] pr-2">
                {dashboardData.recentActivities.adoptions.map((adoption, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {adoption.user.firstname} {adoption.user.lastname}
                      </p>
                      <p className="text-sm text-gray-600">adopted {adoption.pet.name_en}</p>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {new Date(adoption.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard
          title="สถิติการรับเลี้ยงรายเดือน"
          chart={<AdoptionsChart data={dashboardData.monthlyStats.adoptions} />}
        />
        <ChartCard
          title="สัดส่วนสถานะสัตว์เลี้ยง"
          chart={<PetStatusChart data={dashboardData.petsStatusDistribution} />}
        />
      </div>
    </div>
  );
}

// Component for Stats Cards

// Component for Chart Cards
const ChartCard = ({ title, chart }) => (
  <Card className="shadow-md">
    <CardHeader>
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent className="h-[400px]">{chart}</CardContent>
  </Card>
);

// Component for Adoptions Chart
const AdoptionsChart = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
      <XAxis dataKey="created_at" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="_count"
        stroke="#8884d8"
        strokeWidth={2}
        dot={{ fill: "#8884d8" }}
      />
    </LineChart>
  </ResponsiveContainer>
);

// Component for Pet Status Chart
const PetStatusChart = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={data.map(item => ({
          ...item,
          status: STATUS_TRANSLATIONS[item.status] || item.status
        }))}
        dataKey="_count"
        nameKey="status"
        cx="50%"
        cy="50%"
        outerRadius={120}
        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
      >
        {data.map((entry) => (
          // Use the original English status to get the color
          <Cell key={entry.status} fill={STATUS_COLORS[entry.status]} />
        ))}
      </Pie>
      <Tooltip formatter={(value, name) => [`${value} ตัว`, name]} />
    </PieChart>
  </ResponsiveContainer>
)

// Component for Activity Items
const ActivityItem = ({ adoption }) => (
  <div className="flex items-center justify-between border-b pb-4 hover:bg-gray-50 p-2 rounded-lg transition-colors">
    <div>
      <p className="font-medium text-gray-900">
        {adoption.user.firstname} {adoption.user.lastname}
      </p>
      <p className="text-sm text-gray-600">รับเลี้ยง {adoption.pet.name_th}</p>
    </div>
    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
      {new Date(adoption.created_at).toLocaleDateString('th-TH')}
    </span>
  </div>
)