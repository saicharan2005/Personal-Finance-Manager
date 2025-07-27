import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import axiosInstance from '../../utils/axiosInstance';
import { API_ENDPOINTS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import Modal from '../../components/Modal';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import DeleteAlert from '../../components/Income/DeleteAlert';
import ExpenseList from '../../components/Expense/ExpenseList';

const Expense = () => {
  useUserAuth()

   const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
   const [isDownloading, setIsDownloading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data:null,
    });
  
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  
  
  
    const fetchExpensedetails = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `${API_ENDPOINTS.EXPENSE.GET_ALL_EXPENSE}`
        );
        console.log(response.data);
        if (response.data.success) {
          setExpenseData(response.data.expenses);
        }
      } catch (error) {
        console.error("Error fetching expense data:", error);
      } finally {
        setLoading(false);
      }
    };

    const handleAddExpense = async (expense) => {
      const { category, amount, date, icon } = expense;
      if (!category.trim()) {
        toast.error("Category is required");
        return;
      }

      if (!amount || isNaN(amount) || Number(amount) <= 0) {
        toast.error("Valid amount is required and greater than 0");
        return;
      }

      if (!date) {
        toast.error("Date is required");
        return;
      }

      try {
        await axiosInstance.post(API_ENDPOINTS.EXPENSE.ADD_EXPENSE, {
          category,
          amount,
          date,
          icon,
        });
        setOpenAddExpenseModal(false);
        toast.success("Income added successfully");
        fetchExpensedetails(); // Refresh income data after adding
      } catch (error) {
        console.error("Error adding expense:", error);
        toast.error("Failed to add expense");
      }
    };
  
  
    const deleteExpense = async (id) => {
      try {
        await axiosInstance.delete(
          API_ENDPOINTS.EXPENSE.DELETE_EXPENSE(id)
        );
        setOpenDeleteAlert({ show: false, data: null });
        toast.success("Expense deleted successfully");
        fetchExpensedetails(); // Refresh income data after deletion
      } catch (error) {
        console.error("Error deleting expense:", error);
        toast.error("Failed to delete expense");
      }
    };

  const handleDownloadExpenseDetails = async () => {
    if (isDownloading) return; // Prevent multiple clicks

    setIsDownloading(true);
    const toastId = toast.loading("Downloading report...");

    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.EXPENSE.DOWNLOAD_EXPENSE, // Use the correct API endpoint
        {
          responseType: "blob", // Crucial for file downloads
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      // Create a dynamic filename with the current date
      const currentDate = new Date().toISOString().slice(0, 10);
      link.setAttribute("download", `expense_details_${currentDate}.xlsx`);

      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Report downloaded!", { id: toastId });
    } catch (error) {
      console.error("Error downloading expense details:", error);
      toast.error("Download failed. Please try again.", { id: toastId });
    } finally {
      setIsDownloading(false);
    }
  };

  
  
   useEffect(() => {
      fetchExpensedetails();
  
      return () => {};
    },);

  
  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
    isOpen={openDeleteAlert.show}
                  onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                  title="Delete Expense"
                >
                  <DeleteAlert
                    content="Are you sure you want to delete this expense detail?"
                    onDelete={() => deleteExpense(openDeleteAlert.data)}
                  />
                </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Expense