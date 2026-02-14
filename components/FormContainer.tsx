
import React from 'react';
import { LOGO_URL } from '../constants';

interface FormContainerProps {
  children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-[450px] bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center">
        <img 
          src={LOGO_URL} 
          alt="Brand Logo" 
          className="h-12 mb-8 object-contain"
        />
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
