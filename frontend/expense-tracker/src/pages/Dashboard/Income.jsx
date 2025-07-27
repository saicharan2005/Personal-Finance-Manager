import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashBoardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview';
import axiosInstance from '../../utils/axiosInstance';
import { API_ENDPOINTS } from '../../utils/apiPaths';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/Income/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';


const Income = () => {
 useUserAuth()
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data:null,
  });

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);


  //get income data from API
  const fetchIncomedetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.INCOME.GET_ALL_INCOME}`
      ); 
      console.log(response.data);
      if (response.data.incomes) {
        
        
        setIncomeData(response.data.incomes);
      }
    } catch (error) {
      console.error('Error fetching income data:', error);
    } finally {
      setLoading(false);
    }
   };

  const handleAddIncome = async  (income) => { 
    const { source, amount, date, icon } = income;
    if (!source.trim()) {
      toast.error('Source is required');
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error('Valid amount is required and greater than 0');
      return;
    }

    if(!date) {
      toast.error('Date is required');
      return;
    }

    try {
      await axiosInstance.post(API_ENDPOINTS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon
      })
      setOpenAddIncomeModal(false);
      toast.success('Income added successfully');
      fetchIncomedetails(); // Refresh income data after adding

    } catch (error) {
      console.error('Error adding income:', error);
      toast.error('Failed to add income');
    }
  };

  const deleteIncome = async (incomeId) => {
    try {
      await axiosInstance.delete(API_ENDPOINTS.INCOME.DELETE_INCOME(incomeId));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success('Income deleted successfully');
      fetchIncomedetails(); // Refresh income data after deletion
    }
    catch (error) {
      console.error('Error deleting income:', error);
      toast.error('Failed to delete income');
    }
   
   };

  const handleDownloadIncomeDetails = async () => {
     if (isDownloading) return; // Prevent multiple clicks

     setIsDownloading(true);
     const toastId = toast.loading("Downloading report...");

     try {
       const response = await axiosInstance.get(
         API_ENDPOINTS.INCOME.DOWNLOAD_INCOME, // Use the correct API endpoint
         {
           responseType: "blob", // Crucial for file downloads
         }
       );

       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement("a");
       link.href = url;

       // Create a dynamic filename with the current date
       const currentDate = new Date().toISOString().slice(0, 10);
       link.setAttribute("download", `income_details_${currentDate}.xlsx`);

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
    fetchIncomedetails();

    return () => {};
  }, []);
  

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income detail?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Income