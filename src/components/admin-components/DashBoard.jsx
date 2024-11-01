import { useEffect, useState } from "react"
import axios from "axios"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
  Cell
} from "recharts"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']
const STATUS_COLORS = {
    AVAILABLE: '#22c55e',  // green
    PENDING: '#f59e0b',    // amber
    ADOPTED: '#3b82f6',    // blue
    FOSTERED: '#8b5cf6',   // purple
    UNAVAILABLE: '#ef4444' // red
  }
export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/dashboard')
        setDashboardData(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-6 space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Active platform users</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{dashboardData.overview.totalUsers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Pets</CardTitle>
            <CardDescription>Registered pets</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{dashboardData.overview.totalPets}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Adoptions</CardTitle>
            <CardDescription>Successful adoptions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{dashboardData.overview.totalAdoptions}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Adoptions Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Adoptions</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboardData.monthlyStats.adoptions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="created_at" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="_count" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pet Status Distribution */}
        <Card>
  <CardHeader>
    <CardTitle>Pet Status Distribution</CardTitle>
  </CardHeader>
  <CardContent className="h-[300px]">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={dashboardData.petsStatusDistribution}
          dataKey="_count"
          nameKey="status"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label={({ name, percent }) => 
            `${name} (${(percent * 100).toFixed(0)}%)`
          }
        >
          {dashboardData.petsStatusDistribution.map((entry) => (
            <Cell 
              key={entry.status} 
              fill={STATUS_COLORS[entry.status]} 
            />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value, name) => [`${value} pets`, name]}
        />
      </PieChart>
    </ResponsiveContainer>
  </CardContent>
</Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dashboardData.recentActivities.adoptions.map((adoption, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">
                    {adoption.user.firstname} {adoption.user.lastname}
                  </p>
                  <p className="text-sm text-gray-500">
                    adopted {adoption.pet.name_en}
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(adoption.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
