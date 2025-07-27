import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import axiosInstance from '../../utils/axiosInstance';
import { API_ENDPOINTS } from '../../utils/apiPaths';
import { useNavigate } from 'react-router-dom';
import { LuHandCoins,LuWalletMinimal } from 'react-icons/lu';
import { IoMdCard } from 'react-icons/io';
import InfoCard from '../../components/cards/InfoCard';
import { addThousandsSeparator } from '../../utils/helpers';
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
// import ErrorBoundary from '../../components/ErrorBoundary';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
const Home = () => {
   useUserAuth()

  const [DashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${API_ENDPOINTS.DASHBOARD.GET_DATA}`) // Adjust the API endpoint as needed
      console.log('Dashboard Data:', response.data);
      
      if (response.data) {
        setDashboardData(response.data);
      }
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }   
  }

  useEffect(() => {
    fetchDashboardData();
    return () => {
      
    }
  },);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(DashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
          <InfoCard
            icon={<IoMdCard />}
            label="Total Income"
            value={addThousandsSeparator(DashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<IoMdCard />}
            label="Total Expense"
            value={addThousandsSeparator(DashboardData?.totalExpenses || 0)}
            color="bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={DashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={DashboardData?.totalBalance}
            totalIncome={DashboardData?.totalIncome}
            totalExpense={DashboardData?.totalExpenses}
          />

          <ExpenseTransactions
            transactions={DashboardData?.last30DaysExpenses.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />
          <Last30DaysExpenses
            data={DashboardData?.last30DaysExpenses.transactions || []}
          />
          <RecentIncomeWithChart
            data={
              DashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []
            }
            totalIncome={DashboardData?.totalIncome || 0}
          />
          <RecentIncome
            transactions={DashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
          
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Home