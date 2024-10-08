import { useState } from 'react';
import { api } from '../services/api'; // Usando o cliente OpenAPI

export const useVirusTotal = () => {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const scanURL = async (url: string) => {
    try {
      const response = await api.POST("/virus-total/scan", {
        body: { url }, // Enviando a URL para escanear
      });

      if (response.error) {
        setError(response.error.message); // Tratar erro da API
      } else {
        setResult(response.data); // Pegar o resultado da API
      }
    } catch (err) {
      setError('Erro ao escanear URL'); // Tratar erro de conexão
    }
  };

  return { result, error, scanURL };
};
