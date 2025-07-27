const User = require("../models/User");
const Expense = require("../models/Expense");
const xlxs = require("xlsx");

const addExpense = async (req, res) => {
  const userId = req.user._id;
  const { icon, category, amount, date } = req.body;
  console.log({ userId, icon, category, amount, date });

  if (!category || !amount || !date) {
    return res
      .status(400)
      .json({ message: "category and amount and date are required." });
  }

  try {
    const newexpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newexpense.save();
    

    res.status(201).json({
      success: true,
      message: "Expense added successfully",
      newexpense,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllExpenses = async (req, res) => {
  const userId = req.user._id;

  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      message: "Expenses fetched successfully",
      expenses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "expense deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const downloadExpenseExcel = async (req, res) => {
  const userId = req.user._id;

  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    if (expenses.length === 0) {
      return res
        .status(404)
        .json({ message: "No expenses found for this user." });
    }
    const excelData = expenses.map((expense) => ({
      Category: expense.category,
      Amount: expense.amount,
      Date: expense.date.toISOString().split("T")[0],
      Icon: expense.icon || "N/A",
    }));
    const wb = xlxs.utils.book_new();
    const ws = xlxs.utils.json_to_sheet(excelData);
    xlxs.utils.book_append_sheet(wb, ws, "Expenses");
    xlxs.writeFile(wb, `expenses_${userId}.xlsx`);
    res.download(`expenses_${userId}.xlsx`, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Error downloading file" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addExpense,
  getAllExpenses,
  deleteExpense,
  downloadExpenseExcel,
};
