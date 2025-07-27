import moment from "moment";
export function isValidateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);

}


export const getInitials = (fullName) => {
  if (!fullName) return "";
  const names = fullName.split(" ");
  let initials=""
  for(let i=0; i<names.length; i++) {
    if (names[i] && names[i].length > 0) {
      initials += names[i][0];
    }
  }
  return initials.toUpperCase();
}


export const addThousandsSeparator = (num) => {
  if (num === null || isNaN(num)) return "";
  const [integerpart, fractionalpart] = num.toString().split(".");
  const formattedInteger = integerpart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");


    return fractionalpart ? `${formattedInteger}.${fractionalpart}` : formattedInteger;
}


export const prepareExpensesBarChartData = (data = []) => {
  const chartData = data.map((item) => (
    {
      category: item?.category,
      amount: item?.amount,
    }
  ));
  return chartData;
}


export const prepareIncomeBarChartData = (data=[]) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  const chartData = sortedData.map((item) => (
    {
      month: moment(item?.date).format("Do MMM"),
      amount: item?.amount,
      category: item?.source ,
    }
  ));
  return chartData;
}

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    category: item?.category,
  }));
  return chartData;
};