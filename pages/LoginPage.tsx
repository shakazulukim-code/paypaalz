
import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Key, Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  onNext: (email: string, password: string) => void;
  initialEmail: string;
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const LoginPage: React.FC<LoginPageProps> = ({ onNext, initialEmail }) => {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');

  return (
    <FormContainer>
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Sign in</h1>
        
        {/* Email Input Area */}
        <div className="relative w-full">
          <div className={`bg-[#e8f0fe] border rounded-md p-4 pt-6 group focus-within:ring-2 focus-within:ring-[#0b57d0] transition-all ${emailError ? 'border-red-500' : 'border-[#747775]'}`}>
            <label className="absolute left-4 top-2 text-xs font-medium text-[#444746] transition-all">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              className="w-full bg-transparent border-none outline-none text-lg text-black font-medium tracking-wide"
              autoFocus
              placeholder=""
            />
          </div>
          {emailError && (
            <p className="text-red-500 text-sm font-medium mt-2">{emailError}</p>
          )}
        </div>

        {/* Password Input Area */}
        <div className="relative w-full">
          <div className="bg-[#e8f0fe] border border-[#747775] rounded-md p-4 pt-6 group focus-within:ring-2 focus-within:ring-[#0b57d0] transition-all">
            <label className="absolute left-4 top-2 text-xs font-medium text-[#444746] transition-all">
              Enter your password
            </label>
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-lg text-black font-medium tracking-wide"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          <button className="text-[#0b57d0] font-bold text-left text-[14px] hover:underline w-fit">
            Forgot password?
          </button>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-4">
          <button 
            onClick={() => {
              if (!email.trim()) {
                setEmailError('Email is required');
                return;
              }
              if (!isValidEmail(email)) {
                setEmailError('Please enter a valid email address');
                return;
              }
              onNext(email, password);
            }}
            className="w-full bg-[#0b57d0] hover:bg-blue-700 text-white font-bold py-[14px] rounded-full text-base transition-colors"
          >
            Next
          </button>
          
          <button className="w-full bg-white border border-[#747775] hover:bg-gray-50 flex items-center justify-center gap-2 text-black font-bold py-[14px] rounded-full text-base transition-colors">
            <Key size={20} className="transform rotate-45" />
            Log in with Passkey
          </button>
        </div>
      </div>
    </FormContainer>
  );
};

export default LoginPage;
