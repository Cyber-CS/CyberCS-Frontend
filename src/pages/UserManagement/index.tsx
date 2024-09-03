import { User } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Loading } from "~/components";
import { ModalErrorGeneric } from "~/components/Dialog";
import { useGetAllUsersQuery, useDeleteMutation } from "~/hooks";
import { useSession } from "~/session";

function UserManagement() {
  const { user } = useSession();
  const navigate = useNavigate();
  const { data: users, isLoading } = useGetAllUsersQuery();
  const {
    mutate: deleteUser,
    isPending,
    isSuccess,
    isError,
  } = useDeleteMutation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (user.role !== "1") {
      navigate("/");
    }
  }, [user.role, navigate]);

  const handleDelete = (userId: string) => {
    const confirmed = window.confirm(
      "Tem certeza de que deseja excluir este usuário?"
    );
    if (confirmed) {
      deleteUser({ userId });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setShowSuccessModal(true);
    }
  }, [isSuccess]);

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate(0); // Reload the page after closing the success modal
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case "1":
        return "Admin";
      case "0":
        return "Usuário Comum";
      default:
        return "Desconhecido";
    }
  };

  if (isLoading || isPending) return <Loading />;

  return (
    <main className="flex flex-col flex-1 bg-gray-250">
      <section className="container">
        <div className="py-12 text-white flex items-center border-b border-white mb-24">
        <User size={48} />
          <div className="ps-12 ">
            <h1 className="text-24 font-semibold">Gerenciamento de Usuários</h1>
            <h2>Lista de usuários registrados no sistema</h2>
          </div>
        </div>
        <div className="w-full p-12 shadow-lg rounded-8 mt-32 bg-gray-300 text-white">
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b bg-gray-400 text-start">
                  Nome
                </th>
                <th className="py-3 px-4 border-b bg-gray-400 text-start">
                  Username
                </th>
                <th className="py-3 px-4 border-b bg-gray-400 text-start">
                  Email
                </th>
                <th className="py-3 px-4 border-b bg-gray-400 text-start">
                  Permissão
                </th>
                <th className="py-3 px-4 border-b bg-gray-400 text-start">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="">
              {users?.map((user) => (
                <tr key={user._id} className="border-b last:border-none">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.username}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{getRoleName(user.role)}</td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      onClick={() => handleDelete(user._id)}
                      label="Deletar"
                      className="hover:bg-red-800"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6">
          <Button
            onClick={() => navigate("/register")}
            label="Criar Novo Usuário"
            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
          />
        </div>

        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white shadow-2xl max-w-md w-full p-8 rounded-8">
              <h2 className="text-2xl font-semibold text-green-700">
                Usuário deletado com sucesso!
              </h2>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSuccessModalClose}
                  className="bg-gray-900 w-40 text-white font-bold px-6 py-3 rounded-full transition duration-300 ease-in-out shadow-lg"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        )}

        <ModalErrorGeneric.Root
          defaultOpen={isError}
          onOpenChange={() => history.replaceState({}, "")}
        >
          <ModalErrorGeneric.Content
            title="Erro ao deletar usuário"
            description={
              "Ocorreu um erro ao deletar o usuário. Tente novamente ou entre em contato com o administrador."
            }
          />
        </ModalErrorGeneric.Root>
      </section>
    </main>
  );
}

export { UserManagement as Component };
