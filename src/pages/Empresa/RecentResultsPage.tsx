import { MagnifyingGlass } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

// Tipagem dos resultados
interface Result {
  id: string;
  userId: string;
  name: string;
  content: string;
  createdAt: Date;
  length: number;
  registerDate: Date;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RecentResultsPage: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('7'); // Valor padrão para 7 dias

  const handleFetchResults = async () => {
    try {
      const response = await fetch(`http://localhost:3000/recent-results?days=${selectedPeriod}`);
      
      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }

      const data: Result[] = await response.json();
      setResults(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Erro ao buscar resultados:', err.message);
        setError(err.message);
      } else {
        console.error('Erro desconhecido:', err);
        setError('Erro desconhecido ao buscar resultados');
      }
    }
  };

  useEffect(() => {
    handleFetchResults();
  }, [selectedPeriod]);

  // Lógica do gráfico
  const chartData = {
    labels: results.map(result => result.content), // Conteúdo da busca
    datasets: [
      {
        label: 'Total de Respostas',
        data: results.map(result => result.length), // Quantidade de respostas
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
        },
      },
      title: {
        display: true,
        text: 'Resultados Recentes por Conteúdo da Busca',
        color: '#333',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#333',
        },
      },
      y: {
        ticks: {
          color: '#333',
        },
      },
    },
  };

  return (
    <div className='flex-1 bg-gray-250 px-48 py-12'>
      <section className="flex gap-12 items-center py-12 border-b border-white text-white">
        <MagnifyingGlass size={48} />
        <article>
          <h1 className="text-24 font-semibold">Buscas Recentes do Usuário</h1>
          <h2>Analise seu histórico de buscas e resultados</h2>
        </article>
      </section>

      <div className='mt-36'>
        <label htmlFor="period" className='me-12 text-white'>Selecione o período para visualizar o histórico de busca:</label>
        <select 
          className='rounded-8 bg-gray-600 hover:bg-gray-300 text-white'
          id="period" 
          value={selectedPeriod} 
          onChange={(e) => setSelectedPeriod(e.target.value)}
          style={{ padding: '5px' }}
        >
          <option value="7">Últimos 7 dias</option>
          <option value="14">Últimos 14 dias</option>
          <option value="20">Últimos 20 dias</option>
          <option value="30">Últimos 30 dias</option>
        </select>
        
        <button 
          className='border p-4 rounded-8 bg-gray-600 hover:bg-gray-300 text-white ms-12'
          onClick={handleFetchResults} 
        >
          Buscar
        </button>
      </div>

      {error && <div style={{ color: 'red', textAlign: 'center' }}>Erro: {error}</div>}

      {/* Gráfico de Resultados Recentes */}
      {results.length > 0 && (
        <div className="my-32" style={{ width: '600px', height: '400px' }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {results.map(result => (
          <li key={result.id} style={{ 
            backgroundColor: '#fff', 
            border: '1px solid #ccc', 
            borderRadius: '8px', 
            padding: '15px', 
            margin: '10px 0', 
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' 
          }}>
            <p style={{ margin: '5px 0' }}>Hash buscada: {result.content}</p>
            <p style={{ margin: '5px 0', color: '#555' }}>
              Data de varredura: {new Date(result.registerDate).toLocaleString('pt-BR')}
            </p>
            <p style={{ margin: '5px 0', fontWeight: 'bold' }}>
              Total de respostas encontradas: {result.length}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { RecentResultsPage as Component };
