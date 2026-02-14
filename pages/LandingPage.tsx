
import React from 'react';
import FormContainer from '../components/FormContainer';
import { ShieldCheck } from 'lucide-react';

interface LandingPageProps {
  onPaymentClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onPaymentClick }) => {
  return (
    <FormContainer>
      <div className="flex flex-col items-center text-center gap-6">
        <div className="bg-blue-50 p-4 rounded-full text-[#0b57d0]">
          <ShieldCheck size={48} strokeWidth={1.5} />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            Secure Payment Portal
          </h1>
          <p className="text-[#444746] text-base leading-relaxed">
            Welcome to the secure payment gateway. Your transaction is protected by industry-leading encryption and security protocols.
          </p>
        </div>

        <button 
          onClick={onPaymentClick}
          className="w-full bg-[#0b57d0] hover:bg-blue-700 text-white font-bold py-[14px] rounded-full text-base transition-all shadow-md active:scale-[0.98]"
        >
          Make Payment
        </button>

        <p className="text-xs text-gray-400 mt-4 italic">
          Powered by GlobalPay Secure Network
        </p>
      </div>
    </FormContainer>
  );
};

export default LandingPage;
