import React, { useContext } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate,  } from 'react-router-dom';

import { isValidateEmail } from '../../utils/helpers';
import axiosInstance from '../../utils/axiosInstance';
import { API_ENDPOINTS } from "../../utils/apiPaths";
import { UserContext } from '../../context/UserContext';
import Input from '../../components/Input/Input';

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  


  const navigate = useNavigate();
  
  const {updateUser} = useContext(UserContext);


    //handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!isValidateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
       
    }
    if (!password) {
      setError('password is required');
      return;
        
    };
    setError('');


    try {
      const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
    
      console.log('Login successful:', user, token);

      
      if (token) {
        localStorage.setItem('token', token);
         updateUser(user);  // Update user context with the logged-in user data
        navigate('/dashboard'); // Redirect to home page after successful login
      }

    }catch(error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred while logging in. Please try again later.');
      }
    }
  }
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center ">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your credentials to access your account.
        </p>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="charan@gmail.com"
            type="text"
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />
            
                  {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

                  <button type="submit" className='btn-primary'>
                      LOGIN
                  </button>

                  <p className='text-[13px] text-slate-800 mt-3'>
                      Don't have an account?{" "}
                      <Link className='font-medium text-primary underline'
                          to="/signup">SignUp</Link>
                  </p>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Login