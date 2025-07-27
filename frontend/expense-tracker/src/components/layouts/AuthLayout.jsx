import loginimage from '../../assets/images/loginimage.png';
import {LuTrendingUpDown} from 'react-icons/lu';

const AuthLayout = ({ children }) => {
 
  return (
    <div className="flex">
      <div className="w-screen min-h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-semibold text-black "> Expense Tracker</h2>
        {children}
      </div>

      <div className="hidden md:flex w-[40vw] min-h-screen  bg-[#E0F2F1] relative items-center justify-center overflow-hidden">
        {/* Decorative Background Circles - NO BLUR */}
        <div className="w-48 h-48 rounded-[40px] bg-[#14B8A6] absolute -top-7 -left-5 opacity-90"></div>
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-[#2DD4BF] absolute top-[30%] -right-10"></div>
        <div className="w-48 h-48 rounded-[40px] bg-[#14B8A6] absolute -bottom-7 -left-5 opacity-90"></div>

        {/* Card Content */}
        <div className="z-30 flex flex-col items-center justify-center space-y-8 px-6">
          <StatsInfocard
            icon={<LuTrendingUpDown />}
            label="Track your income and expenses"
            value="$5,000"
            color="bg-primary"
          />

          <img
            src={loginimage}
            alt="Login Visual"
            className="w-64 lg:w-[80%] shadow-lg rounded-2xl shadow-teal-400/20 transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout

const StatsInfocard = ({ icon, label, value, color }) => {
  return (
      <div className='flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-teal-200/10 border border-gray-200/50 z-10'>
          <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
         {icon}
          </div> 
          <div>
              <h6 className='text-xs text-gray-500 mb-1'>{label}</h6>
              <span className='text-[20px]'>{value}</span>
          </div>
    </div>
  );
}