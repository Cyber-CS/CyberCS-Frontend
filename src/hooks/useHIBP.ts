import { useState } from 'react';

export const useHIBP = () => {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const checkBreachedAccount = async (email: string) => {
    setError(null); // Reseta o erro antes de nova requisição
    try {
      console.log(`Verificando email: ${email}`);
      const response = await fetch(`http://localhost:3000/hibp/check-account?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Erro na requisição:", err);
      // Verifica se err é um objeto de erro com a propriedade message
      if (err instanceof Error) {
        setError(err.message || "Ocorreu um erro ao verificar o e-mail.");
      } else {
        setError("Ocorreu um erro desconhecido ao verificar o e-mail.");
      }
    }
  };

  return { result, error, checkBreachedAccount };
};
