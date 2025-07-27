const User = require("../models/User");
const Income = require("../models/Income");
const xlxs = require("xlsx");

const addIncome = async (req, res) => {
    const userId = req.user._id;
    const { icon, source, amount, date } = req.body;
    console.log({ userId, icon, source, amount, date });
    
    if (!source || !amount || !date) {
        return res.status(400).json({ message: "Source and amount and date are required." });
    }   


    try {
        const newincome = new  Income({
            userId,
            icon,
            source,
            amount,
            date :new Date(date),
        });

        await newincome.save();

        res.status(201).json({
            success: true,
            message: "Income added successfully",
            newincome,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const getAllIncomes = async (req, res) => {

    const userId = req.user._id;

    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });

        res.status(200).json({
            success: true,
            message: "Incomes fetched successfully",
            incomes,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteIncome = async (req, res) => {
    
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Income deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });  
        

}
   
};

const downloadIncomeExcel = async (req, res) => {
    const userId = req.user._id;
    
    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        if (incomes.length === 0) {
            return res.status(404).json({ message: "No incomes found for this user." });
        }
        const excelData = incomes.map(income => ({
            Source: income.source,
            Amount: income.amount,
            Date: income.date.toISOString().split('T')[0],
            Icon: income.icon || 'N/A',
        }));
        const wb = xlxs.utils.book_new();
        const ws = xlxs.utils.json_to_sheet(excelData);
        xlxs.utils.book_append_sheet(wb, ws, "Incomes");
        xlxs.writeFile(wb, `incomes_${userId}.xlsx`);
        res.download(`incomes_${userId}.xlsx`, (err) => {
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
    addIncome,
    getAllIncomes,
    deleteIncome,
    downloadIncomeExcel,
}