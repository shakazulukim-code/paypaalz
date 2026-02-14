
import React, { useState, useRef, useEffect } from 'react';
import FormContainer from '../components/FormContainer';

interface VerificationPageProps {
  email: string;
  title: string;
  onSubmit: (otp: string) => void;
  onBack: () => void;
}

const VerificationPage: React.FC<VerificationPageProps> = ({ email, title, onSubmit, onBack }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1];
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const combinedOtp = otp.join('');
    if (combinedOtp.length === 6) {
      onSubmit(combinedOtp);
      // Reset OTP for potential next step
      setOtp(['', '', '', '', '', '']);
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <FormContainer>
      <div className="flex flex-col gap-4">
        <h1 className="text-[34px] font-bold text-black leading-tight">
          {title}
        </h1>
        
        <div className="flex flex-col gap-1 mb-2">
           <span className="text-[#0b57d0] font-semibold text-lg">{email}</span>
           <p className="text-[#444746] text-[15px]">
            We sent a security code to your email and phone number.
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-between gap-2 md:gap-4 my-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-full h-14 md:h-16 bg-[#f1f3f4] border-none rounded-xl text-center text-2xl font-semibold text-black focus:bg-white focus:ring-2 focus:ring-[#0b57d0] transition-all outline-none"
            />
          ))}
        </div>

        {/* Resend Link */}
        <button className="text-[#0b57d0] font-bold text-left text-[15px] hover:underline w-fit">
          Resend code
        </button>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-6">
          <button 
            onClick={handleSubmit}
            className="w-full bg-[#0b57d0] hover:bg-blue-700 text-white font-bold py-[14px] rounded-full text-base transition-colors"
          >
            Submit
          </button>
          
          <button 
            onClick={onBack}
            className="w-full bg-white border border-[#dadce0] hover:bg-gray-50 text-[#0b57d0] font-bold py-[14px] rounded-full text-base transition-colors"
          >
            Need more options?
          </button>
        </div>
      </div>
    </FormContainer>
  );
};

export default VerificationPage;
