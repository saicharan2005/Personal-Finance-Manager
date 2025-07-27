import React, { useContext } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate,  } from 'react-router-dom';
import Input from '../../components/Input/input';
import { isValidateEmail } from '../../utils/helpers';
import ProfilePhotoSelector from '../../components/Input/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_ENDPOINTS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const [profilePic, setProfilePic] = React.useState(null);
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);

  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);


  //handle login
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl=""

    if(!fullName) {
      setError("Full name is required.");
      return;
    }

    if (!isValidateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("password is required");
      return;
    }
    setError("");


    try {
      if (profilePic) {
        const imageUploadResponse = await uploadImage(profilePic);
        profileImageUrl = imageUploadResponse.imageUrl || ""; // Assuming the response contains the image URL
        };

      const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });
      const { token, user } = response.data;

      console.log("Register successful:", user, token);

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user); // Update user context with the logged-in user data
        navigate("/dashboard"); // Redirect to home page after successful login
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while register in. Please try again later.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center ">
        <h3 className="text-xl font-semibold text-black">Create an Account </h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={ profilePic} setImage={ setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label="Full Name"
              placeholder="charan"
              type="text"
            />

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="charan@gmail.com"
              type="text"
            />

            <div className="col-span-2">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="Min 8 Characters"
                type="password"
              />
            </div>
          </div>


                            {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          
                            <button type="submit" className='btn-primary'>
                                SIGN UP
                            </button>
          
                            <p className='text-[13px] text-slate-800 mt-3'>
                                Already have an account?{" "}
                                <Link className='font-medium text-primary underline'
                                    to="/login">Login</Link>
                            </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;