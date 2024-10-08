import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button, Input, Loading } from "~/components";
import { ModalErrorGeneric } from "~/components/Dialog";
import { useRegisterMutation } from "~/hooks";
import { useSession } from "~/session";

const registerSchema = z.object({
  username: z.string().nonempty("O campo de usuário não pode estar vazio"),
  name: z.string().nonempty("O campo de nome não pode estar vazio"),
  email: z
    .string()
    .email("Email inválido")
    .nonempty("O campo de email não pode estar vazio"),
  password: z.string().nonempty("O campo de senha não pode estar vazio"),
  role: z.enum(["0", "1"], { required_error: "Selecione o tipo de usuário" }),
});

export type RegisterFields = z.infer<typeof registerSchema>;

function RegisterPage() {
  const { user } = useSession();
  const {
    mutate: register,
    isPending,
    isSuccess,
    isError,
  } = useRegisterMutation();
  const {
    register: formRegister,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterFields>({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onSubmit = handleSubmit(
    async (fields) => {
      register(fields);
      reset();
    },
    (error) => console.error(error)
  );

  useEffect(() => {
    if (user.role !== "1") {
      navigate("/");
    }
    if (isSuccess) {
      setShowSuccessModal(true);
    }
  }, [isSuccess]);

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate("/user-management");
  };

  if (isPending) return <Loading />;

  return (
    <main className="flex flex-col flex-1 bg-gray-250">
      <section className="container">
        <div className="py-12 text-white flex items-center border-b border-white mb-24">
          {<User size={48} />}
          <div className="ps-12">
            <h1 className="text-24 font-semibold">Cadastrar Usuário</h1>
            <h2>Cadastrar um novo usuário no sistema</h2>
          </div>
        </div>

        <div className="w-full max-w-2xl p-12 shadow-lg rounded-8 bg-gray-300 mx-auto mt-64">
          <form className="space-y-20" onSubmit={onSubmit}>
            <Input.LoginField
              id="username"
              label="Usuário"
              placeholder="Digite o usuário"
              {...formRegister("username")}
              error={!!errors.username}
              message={errors.username?.message}
            />
            <Input.LoginField
              id="name"
              label="Nome"
              placeholder="Digite o nome"
              {...formRegister("name")}
              error={!!errors.name}
              message={errors.name?.message}
            />
            <Input.LoginField
              id="email"
              label="Email"
              placeholder="Digite o email"
              {...formRegister("email")}
              error={!!errors.email}
              message={errors.email?.message}
            />
            <Input.LoginField
              id="password"
              label="Senha"
              type="password"
              placeholder="Digite a senha"
              {...formRegister("password")}
              error={!!errors.password}
              message={errors.password?.message}
            />

            <div className="space-y-6 text-white">
              <label className="block">Tipo de Usuário</label>
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-3">
                  <input type="radio" value="0" {...formRegister("role")} />
                  <span>Usuário Comum</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="radio" value="1" {...formRegister("role")} />
                  <span>Admin</span>
                </label>
              </div>
              {errors.role && (
                <span className="text-red-500 text-sm">
                  {errors.role.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              label="Cadastrar"
              className="w-full hover:bg-gray-800"
            />
          </form>
        </div>

        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white shadow-2xl max-w-md w-full p-8 rounded-8">
              <h2 className="text-2xl font-semibold text-green-700">
                Cadastro realizado com sucesso!
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
            title="Erro ao cadastrar usuário"
            description={
              "Ocorreu um erro ao cadastrar o usuário. Tente novamente ou entre em contato com o administrador."
            }
          />
        </ModalErrorGeneric.Root>
      </section>
    </main>
  );
}

export { RegisterPage as Component };
