
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, PieChart, LineChart, LayoutDashboard } from "lucide-react";
import { Donation } from "./types";
import { formatCurrency, getTotalByType } from "./utils";
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line
} from 'recharts';

interface DonationsDashboardProps {
  donations: Donation[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const DONOR_TYPES = ['associado', 'voluntario', 'coordenador', 'externo'];
const DONOR_LABELS = {
  associado: 'Associados',
  voluntario: 'Voluntários',
  coordenador: 'Coordenadores',
  externo: 'Externos'
};

const DonationsDashboard = ({ donations }: DonationsDashboardProps) => {
  // Prepare data for the pie chart (donations by donor type)
  const pieChartData = DONOR_TYPES.map(type => ({
    name: DONOR_LABELS[type as keyof typeof DONOR_LABELS],
    value: getTotalByType(donations, type)
  })).filter(item => item.value > 0);

  // Prepare data for the bar chart (count of donations by donor type)
  const barChartData = DONOR_TYPES.map(type => ({
    name: DONOR_LABELS[type as keyof typeof DONOR_LABELS],
    count: donations.filter(d => d.donorType === type).length
  }));

  // Prepare data for the line chart (donations over time)
  const lineChartData = () => {
    // Group donations by month
    const donationsByMonth: Record<string, number> = {};
    
    donations.forEach(donation => {
      const date = new Date(donation.date);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      
      if (!donationsByMonth[monthYear]) {
        donationsByMonth[monthYear] = 0;
      }
      
      donationsByMonth[monthYear] += donation.amount;
    });
    
    // Convert to array format for recharts
    return Object.entries(donationsByMonth)
      .map(([month, amount]) => ({ month, amount }))
      .sort((a, b) => {
        // Sort by date
        const [monthA, yearA] = a.month.split('/');
        const [monthB, yearB] = b.month.split('/');
        return new Date(parseInt(yearA), parseInt(monthA) - 1).getTime() - 
               new Date(parseInt(yearB), parseInt(monthB) - 1).getTime();
      });
  };

  const totalDonations = getTotalByType(donations, "all");

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <LayoutDashboard className="h-6 w-6 mr-2 text-indigo-600" />
        <h2 className="text-2xl font-semibold">Dashboard de Doações</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total de Doações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(totalDonations)}</p>
            <p className="text-sm text-gray-500">{donations.length} doações registradas</p>
          </CardContent>
        </Card>
        
        {DONOR_TYPES.map(type => (
          <Card key={type}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {DONOR_LABELS[type as keyof typeof DONOR_LABELS]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatCurrency(getTotalByType(donations, type))}</p>
              <p className="text-sm text-gray-500">
                {donations.filter(d => d.donorType === type).length} doações
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-indigo-600" />
              Doações por Tipo de Doador
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="h-5 w-5 mr-2 text-indigo-600" />
              Contagem de Doações por Tipo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" name="Quantidade" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LineChart className="h-5 w-5 mr-2 text-indigo-600" />
              Doações ao Longo do Tempo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={lineChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#8884d8"
                    name="Valor Doado"
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonationsDashboard;
