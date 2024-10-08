import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando o hook de navegação
import { useSearchByHashMutation } from '../../hooks/empresa/useSearchByHashMutation';
import { useGetAllEmpresasQuery } from '../../hooks/empresa/useGetAllEmpresasQuery';
import { BitbucketLogo, GithubLogo } from '~/icons';
import { MagnifyingGlass, FileDashed, Link as LinkIcon, IdentificationCard } from '@phosphor-icons/react';

type SearchResult = {
  filePath: string;
  codeContent: string;
  repositoryName: string;  
  repositoryUrl: string;
  foundIn: string;    
};

function SearchByHashPage() {
  const navigate = useNavigate(); // Hook para redirecionamento
  const { data: empresas } = useGetAllEmpresasQuery();
  const { mutateAsync: searchByHash } = useSearchByHashMutation();
  const [selectedEmpresaId, setSelectedEmpresaId] = useState('');
  const [selectedHash, setSelectedHash] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Função para lidar com o clique no botão de busca
  const handleSearchClick = async () => {
    setHasSearched(false);
    setErrorMessage(''); // Limpa mensagens de erro anteriores

    if (selectedEmpresaId && selectedHash) {
      try {
        const response = await searchByHash({ empresaId: selectedEmpresaId, hash: selectedHash });

        // Verifica se a resposta contém dados
        if (response && response.response) {
          setResults(response.response);
        } else {
          setResults([]);
        }
        
        setHasSearched(true);
      } catch (error) {
        console.error('Erro ao buscar por hash:', error);
        setErrorMessage('Erro ao realizar a busca. Tente novamente.'); // Mensagem de erro amigável
      }
    } else {
      setErrorMessage('Por favor, selecione uma empresa e uma hash.');
    }
  };

  // Função para redirecionar para o histórico de busca
  const handleGoToRecentResults = () => {
    navigate('/recent-results'); // Redireciona para a rota /recent-results
  };

  return (
    <div className="search-by-hash-page flex-1 bg-gray-250 px-48 text-white">
      <section className="flex gap-12 items-center py-12 border-b border-white">
        <MagnifyingGlass size={48} />
        <article>
          <h1 className="text-24 font-semibold">Pesquisar Código Fonte</h1>
          <h2>Pesquise hash da empresa cadastrada no sistema de forma manual ou automática</h2>
        </article>

        {/* Botão para ver o histórico de buscas */}
        <button 
          onClick={handleGoToRecentResults} 
          className="ml-auto bg-gray-600 text-white p-4 px-12 rounded-8 hover:bg-gray-700"
        >
          Ver Histórico de Buscas
        </button>
      </section>
    
      <div>
        {/* Seção de seleção de empresa e hash */}
        <section className='my-24'>
          <label htmlFor="empresa-select" className='pe-6'>Selecionar Empresa:</label>
          <select
            className='rounded-8 p-4 bg-gray-600 hover:bg-gray-300'
            id="empresa-select"
            value={selectedEmpresaId}
            onChange={(e) => {
              setSelectedEmpresaId(e.target.value);
              setSelectedHash(''); // Limpa a hash selecionada ao mudar a empresa
            }}
          >
            <option value="" disabled>Selecione uma empresa</option>
            {empresas?.map((empresa) => (
              <option key={empresa._id} value={empresa._id}>{empresa.name}</option>
            ))}
          </select>
        </section>

        <section className='my-24'>
          <label htmlFor="hash-select" className='pe-6'>Selecionar Hash:</label>
          <select
            className='rounded-8 p-4 bg-gray-600 hover:bg-gray-300'
            id="hash-select"
            value={selectedHash}
            onChange={(e) => setSelectedHash(e.target.value)}
            disabled={!selectedEmpresaId}
          >
            <option value="" disabled>Selecione uma hash</option>
            {empresas?.find((empresa) => empresa._id === selectedEmpresaId)?.hash && (
              <option value={empresas.find((empresa) => empresa._id === selectedEmpresaId)?.hash}>
                {empresas.find((empresa) => empresa._id === selectedEmpresaId)?.hash}
              </option>
            )}
          </select>
        </section>

        <button 
          onClick={handleSearchClick} 
          className="bg-gray-600 text-white p-4 px-164 rounded-8 hover:bg-gray-700"
        >
          Buscar
        </button>
      </div>
      
      <div className='mb-48'>
        {/* Exibir Resultados */}
        <div className='mt-48'>
          <h1 className="text-24 mb-12 font-semibold">Resultados da Busca:</h1>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {!hasSearched ? (
            <></>
          ) : results.length === 0 ? (
            <p>Nenhum resultado encontrado.</p>
          ) : (
            <section className="space-y-48">
              {results.map((result, index) => (
                <div className="bg-gray-600 p-12 rounded-12" key={index}>
                  <h3 className="text-18 font-bold mb-12 flex gap-12 items-center">
                    <span>{index + 1}ª Ocorrência</span>
                    {result.repositoryUrl.includes("bitbucket") ? (
                      <BitbucketLogo className="w-100"/> 
                    ) : (
                      <GithubLogo className="w-100"/>
                    )}
                  </h3>
                  <ul className="space-y-16">
                    <li className="bg-gray-50 rounded-8">
                      <div className="flex gap-8 text-gray-900 p-12 border-b border-gray-700">
                        <IdentificationCard size={24} />
                        <div className="flex gap-8">
                          <p className="font-semibold">Nome do repositório:</p>
                          <h4 className="break-all">{result.repositoryName}</h4>
                        </div>
                      </div>
                      <div className="flex gap-8 text-gray-900 p-12 border-b border-gray-700">
                        <div className="flex gap-8">
                          <LinkIcon size={24} />
                          <span className="font-semibold">Link:</span>
                          <span className="break-all">
                            {result.repositoryUrl}
                          </span>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="flex justify-between bg-gray-50 text-gray-900 rounded-8 rounded-b-none p-12">
                        <div className="flex">
                          <FileDashed size={24} className="mr-4" />
                          <p className="font-bold mr-12">Arquivo encontrado:</p>
                          <h4>
                            <code className="break-all">{result.filePath}</code>
                          </h4>
                        </div>
                      </div>

                      <div className="bg-gray-900 rounded-8 rounded-t-none p-12 text-14 overflow-y-auto max-h-[300px]">
                        <pre className="text-white">
                          <code>{result.codeContent}</code>
                        </pre>
                      </div>
                    </li>
                  </ul>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export { SearchByHashPage as Component };
