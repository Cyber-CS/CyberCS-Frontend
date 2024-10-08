import React from 'react';

interface EmpresaInputProps {
  label: string;
  name: string;
  register: any; // Esse tipo pode ser mais específico dependendo da sua configuração do useForm
  error?: boolean;
  message?: string;
  placeholder?: string;
}

const EmpresaInput: React.FC<EmpresaInputProps> = ({ 
  label, 
  name, 
  register, 
  error, 
  message, 
  placeholder 
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        {...register(name)}
        className={`mt-1 block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
      />
      {error && <p className="mt-2 text-sm text-red-600">{message}</p>}
    </div>
  );
};

export default EmpresaInput;
