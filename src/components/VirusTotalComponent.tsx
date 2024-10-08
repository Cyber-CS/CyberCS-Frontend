import { useState } from 'react';
import { useVirusTotal } from '../hooks/useVirusTotal'; // O caminho do hook pode variar
import { Fingerprint } from '@phosphor-icons/react';
import { Loading } from './'; // Import your Loading component

// Defina as interfaces para o resultado e detalhes
interface ScanResult {
  data: {
    attributes: {
      status: string;
      stats: {
        malicious: number;
        suspicious: number;
        harmless: number;
        undetected: number;
      };
      results: Record<string, ScanDetail>; // Um dicionário onde a chave é o nome do motor e o valor é um ScanDetail
    };
  };
}

interface ScanDetail {
  result: string; // ou o tipo correto do resultado
  category: string; // ou o tipo correto da categoria
}

const VirusTotalComponent = () => {
  const [url, setUrl] = useState('');
  const { result, error, scanURL } = useVirusTotal();
  const [loading, setLoading] = useState(false); // State to track loading

  const handleScan = async () => {
    setLoading(true); // Set loading to true when scan starts
    await scanURL(url); // Assuming scanURL returns a promise
    setLoading(false); // Set loading to false when scan is complete
  };

  const renderScanResult = (result: ScanResult) => {
    const { attributes } = result.data;
    const { status, stats, results } = attributes;
    
    return (
      <div>
        <h3>Resultado da Análise</h3>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Malicioso:</strong> {stats.malicious}</p>
        <p><strong>Suspeito:</strong> {stats.suspicious}</p>
        <p><strong>Inofensivo:</strong> {stats.harmless}</p>
        <p><strong>Indetectável:</strong> {stats.undetected}</p>

        <h4>Detalhes dos Motores:</h4>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Motor</th>
              <th className="px-4 py-2">Resultado</th>
              <th className="px-4 py-2">Categoria</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(results).map(([engine, details]) => (
              <tr key={engine}>
                <td className="border px-4 py-2">{engine}</td>
                <td className="border px-4 py-2">{details.result}</td>
                <td className="border px-4 py-2">{details.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <section className="flex gap-12 items-center py-12 border-b border-white">
        <Fingerprint size={48} />
        <article>
          <h1 className="text-24 font-semibold">URL Scanner</h1>
          <h2>Verifique se a URL é confiável</h2>
        </article>
      </section>
      <section className="w-full h-full bg-gray-300 rounded-8 p-24 mt-48 my-32">
        <label className="text-lg">Digite a URL:</label>

        <div className="flex items-center gap-4 mt-12">
          <Fingerprint size={24} />
          <input
            className="p-12 rounded-8 bg-gray-250 text-black w-full"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="exemplo.com"
          /> 
        </div>
        <div className='text-center font-bold mt-12'>
          <button onClick={handleScan} disabled={loading} className="bg-gray-400 hover:bg-gray-900 p-8 rounded-8">
            {loading ? 'Scanning...' : 'Scan URL'}
          </button>
        </div>
      </section>
      
      {loading && <Loading />} {/* Show Loading component when loading */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && renderScanResult(result)} {/* Render result using the new renderScanResult function */}
    </div>
  );
};

export default VirusTotalComponent;
