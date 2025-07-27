import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import { prepareIncomeBarChartData } from '../../utils/helpers';
import CustomBarChart from '../Charts/CustomBarChart';

const IncomeOverview = ({ transactions,
  onAddIncome }) => {
  
  console.log(transactions);
  
  
  const [chartData, setChartData] = useState([]);
  

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    console.log(result);
    
      setChartData(result);
  }, [transactions]);
  
  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <div className="">
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track Your earnings over time and analuse your income trends
          </p>
        </div>

        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" />
          Add Income
        </button>
        
      </div>

      <div className="mt-10">
        <CustomBarChart
          data={chartData} />
      </div>
    </div>
  );
}

export default IncomeOverview