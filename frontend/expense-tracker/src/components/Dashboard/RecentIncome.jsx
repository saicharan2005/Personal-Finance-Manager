import React from "react";
import moment from "moment";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../cards/TransactionInfoCard";

const RecentIncome = ({ transactions, onSeeMore }) => {
  console.log("Recent Transactions:", transactions);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Income</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5).map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={ item.source}
            icon={item.icon}
            date={moment(item.date).format("DD MMM YYYY")}
            amount={item.amount}
            type="income"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentIncome;
