export const API_BASE_URL =`${import.meta.env.VITE_BACKEND_URL}`;
// export const API_BASE_URL = "http://localhost:8000";
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        GET_USER_INFO: '/api/auth/getuser',

    },
    DASHBOARD: {
        GET_DATA: "/api/dashboard",
    },
    INCOME: {

        ADD_INCOME: '/api/income/add',
        GET_ALL_INCOME: '/api/income/get',
        DELETE_INCOME: (incomeId) => `/api/income/${incomeId}`,
        DOWNLOAD_INCOME: '/api/income/downloadexcel',
    },
    EXPENSE: {
        ADD_EXPENSE: '/api/expense/add',
        GET_ALL_EXPENSE: '/api/expense/get',
        DELETE_EXPENSE: (expenseId) => `/api/expense/${expenseId}`,
        DOWNLOAD_EXPENSE: '/api/expense/downloadexcel',
    },
    IMAGE: {
        UPLOAD_IMAGE: '/api/auth/upload-image',
      
    },
}