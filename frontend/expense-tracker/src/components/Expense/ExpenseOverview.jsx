import React, { useEffect, useState } from 'react'

import { prepareExpenseLineChartData } from '../../utils/helpers';
import CustomLineChart from '../Charts/CustomLineChart';
import { LuPlus } from 'react-icons/lu';

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  console.log(transactions);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    console.log(result);

    setChartData(result);
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <div className="">
          <h5 className="text-lg">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your expenses over time and analyze spending trends
            effectively.
          </p>
        </div>

        <button className="add-btn" onClick={onAddExpense}>
          <LuPlus
           className="text-lg" />
          Add Expense
        </button>
      </div>

      <div className="mt-10">
              <CustomLineChart
                  data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;