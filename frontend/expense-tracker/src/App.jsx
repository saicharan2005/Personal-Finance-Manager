

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import Home from './pages/Dashboard/Home';
import UserProvider from './context/UserContext';
import { Toaster } from 'react-hot-toast';
function App() {
  

  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/income" exact element={<Income />} />
            <Route path="/expense" exact element={<Expense />} />
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOptions={{
          className: 'bg-gray-800 text-white',
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: '#4caf50',
              color: '#fff',
            },
          },
          error: {
            duration: 3000,
            style: {
              background: '#f44336',
              color: '#fff',
            },
          },
        } }
        />
    </UserProvider>
  );
}

export default App


const Root = () => {
  //check is authenticated user
  const isAuthenticated = !!localStorage.getItem('token');
  // Redirect based on authentication status
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;

}