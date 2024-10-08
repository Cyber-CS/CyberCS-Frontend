import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import EmpresaInput from '../../components/EmpresaInput';
import { useGetAllEmpresasQuery } from '../../hooks/empresa/useGetAllEmpresasQuery';
import { useSaveEmpresaMutation } from '../../hooks/empresa/useSaveEmpresaMutation';
import { useUpdateEmpresaMutation } from '../../hooks/empresa/useUpdateEmpresaMutation';
import { useDeleteEmpresaMutation } from '../../hooks/empresa/useDeleteEmpresaMutation';

interface EmpresaFormData {
  name: string;
  hash: string; // Um único hash
}

interface Empresa {
  _id: string;
  name: string;
  hash: string; // Mantém um único hash
}

function EmpresaPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<EmpresaFormData>({
    defaultValues: {
      hash: '', // Inicializa com um campo vazio para hash
    },
  });
  const { mutate: saveEmpresa } = useSaveEmpresaMutation();
  
  const { data: empresas = [], isLoading, isError, refetch } = useGetAllEmpresasQuery(); // Inicializa como um array vazio
  const { mutate: updateEmpresa } = useUpdateEmpresaMutation();
  const { mutate: deleteEmpresa } = useDeleteEmpresaMutation();

  const [editEmpresaId, setEditEmpresaId] = useState<string | null>(null);
  const [editEmpresaData, setEditEmpresaData] = useState<{ name: string; hash: string }>({
    name: '',
    hash: '',
  });

  const onSubmit = (data: EmpresaFormData) => {
    console.log(data);
    saveEmpresa(data);
    refetch(); // Atualiza a lista após salvar
  };

  const handleEditClick = (empresa: Empresa) => {
    setEditEmpresaId(empresa._id);
    setEditEmpresaData({ name: empresa.name, hash: empresa.hash }); // Define os dados da empresa a serem editados
  };

  const handleSaveClick = () => {
    if (editEmpresaId) {
      updateEmpresa(
        { id: editEmpresaId, name: editEmpresaData.name, hash: editEmpresaData.hash }, // Somente um hash
        {
          onSuccess: () => {
            setEditEmpresaId(null); // Limpa o estado de edição
            refetch(); // Atualiza a lista ao concluir a edição
          },
        }
      );
    }
  };

  const handleDeleteClick = (id: string) => {
    // Adiciona a confirmação antes de excluir
    const confirmDelete = window.confirm('Você tem certeza que deseja excluir esta empresa?');
    if (confirmDelete) {
      deleteEmpresa(
        { id },
        {
          onSuccess: () => {
            refetch(); // Refetch para garantir a atualização após deletar
          },
        }
      );
    }
  };

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar empresas.</p>;

  return (
    <div className="p-4 flex-1 bg-gray-250 px-48">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Empresas</h1>
      
      {/* Formulário para cadastrar empresas */}
      <form className='mb-48 p-4' onSubmit={handleSubmit(onSubmit)}>
        <EmpresaInput
          label="Nome da Empresa"
          name="name"
          register={register}
          error={!!errors.name}
          message={errors.name?.message}
          placeholder="Digite o nome da empresa"
        />

        {/* Campo para hash */}
        <label className="block mt-4">Hash</label>
        <input
          {...register('hash', { required: "A hash é obrigatória" })} // Validação para hash
          placeholder="Digite uma hash"
          className={`border rounded-md p-2 ${errors.hash ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.hash && <p className="text-red-500">{errors.hash.message}</p>}

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Salvar
        </button>
      </form>

      <section>
        <h2 className="text-xl font-bold mb-12">Empresas Registradas</h2>
        {empresas.map((empresa) => (
          <div key={empresa._id} className="mb-12 p-4 border rounded-8 shadow-md">
            {editEmpresaId === empresa._id ? (
              <>
                <input
                  type="text"
                  value={editEmpresaData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditEmpresaData({ ...editEmpresaData, name: e.target.value })
                  }
                  placeholder="Nome da Empresa"
                  className="border p-2 rounded-md mb-2 w-full"
                />
                <input
                  type="text"
                  value={editEmpresaData.hash} // Mostra a hash única
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditEmpresaData({
                      ...editEmpresaData,
                      hash: e.target.value, // Atualiza o hash
                    })
                  }
                  placeholder="Hash"
                  className="border p-2 rounded-md mb-2 w-full"
                />
                <button
                  onClick={handleSaveClick} // Botão para salvar as edições
                  className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Salvar
                </button>
                <button
                  onClick={() => setEditEmpresaId(null)} // Botão para cancelar a edição
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <p><strong>Nome:</strong> {empresa.name}</p>
                <p><strong>Hash:</strong> {empresa.hash}</p> {/* Mostrando a hash única */}
                <button
                  onClick={() => handleEditClick(empresa)} // Botão para iniciar a edição
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteClick(empresa._id)} // Botão para excluir
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Excluir
                </button>
              </>
            )}
          </div>
        ))}
      </section>
      {/* Lista de empresas */}
      
      
    </div>
  );
}

export { EmpresaPage as Component };
