import { useState } from 'react';
import { useHIBP } from '../../hooks/useHIBP';
import { EnvelopeSimple, ShieldCheck } from '@phosphor-icons/react';

const HIBPCheckPage = () => {
  const [email, setEmail] = useState('');
  const { result, error, checkBreachedAccount } = useHIBP();

  const handleCheck = () => {
    if (!email) {
      alert("Por favor, insira um e-mail válido."); // Alerta para e-mail vazio
      return;
    }
    checkBreachedAccount(email);
  };

  return (
    <main className="bg-gray-150 flex-1 text-white w-full">
      <div className="container flex flex-col gap-48">
        <section className="flex gap-12 items-center py-12 border-b border-white">
          <ShieldCheck size={48} />
          <article>
            <h1 className="text-24 font-semibold">Verificar Email</h1>
            <h2>Verifique se seu email foi comprometido</h2>
          </article>
        </section>
        <section className="w-full h-full bg-gray-300 rounded-8 p-24">
          <div className="flex flex-col space-y-12">
            <label className="text-lg">Digite o seu e-mail:</label>
            <div className="flex items-center gap-4">
              <EnvelopeSimple size={24} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite o e-mail"
                className="p-12 rounded-8 bg-gray-250 text-black w-full"
              />
            </div>
            <div className='text-center font-bold mt-12'>
              <button
                onClick={handleCheck}
                className="bg-gray-400 hover:bg-gray-900 p-8 rounded-8">
                Verificar Email
              </button>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            {result && (
              <div>
                <h3 className="text-lg font-bold">Resultado:</h3>
                {result.status === 'não vazado' ? (
                  <p className="text-green-500">Email não vazado</p>
                ) : (
                  <div>
                    <p className="text-red-500">Email vazado</p>
                    {result.breaches.map((breach: any, index: number) => (
                      <div key={index} className="my-4 p-4 border border-gray-200 rounded">
                        {breach.logo && (
                          <img src={breach.logo} alt={breach.title} className="h-12" />
                        )}
                        <h4 className="font-semibold">{breach.title}</h4>
                        <p><strong>Data do vazamento:</strong> {breach.date}</p>
                        <p><strong>Descrição:</strong> {breach.description}</p>
                        <p><strong>Dados comprometidos:</strong> {breach.compromisedData}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export { HIBPCheckPage as Component };
