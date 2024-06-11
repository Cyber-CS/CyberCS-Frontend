import { Button, Input } from "~/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Loading } from "~/components";
import { useLoginMutation } from "~/hooks";
import { Password, User } from "@phosphor-icons/react";

export default function LoginPage() {
  return (
    <main className="bg-gray-700 flex-1 text-white w-full ">
      <div className="container flex flex-col gap-32 items-center py-72">
        <LoginForm />
      </div>
    </main>
  );
}

export const LoginForm = () => {
  const {
    mutate: login,
    isPending,
    isSuccess,
    status,
    isError,
  } = useLoginMutation();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFields>({ resolver: zodResolver(loginSchema) });
  const navigate = useNavigate();

  const onSubmit = handleSubmit(
    async (fields) => {
      login(fields);
      reset();
    },
    (error) => console.error(error)
  );

  useEffect(() => {
    if (isSuccess) {
      navigate("/security");
    }
  }, [isSuccess, status]);

  if (isPending) return <Loading />;

  return (
    <>
      <form className="space-y-20 px-16" onSubmit={onSubmit}>
        <Input.LoginField
          id="username"
          label="Usuário"
          icon={<User className="h-20 w-20" />}
          placeholder="Digite seu usuário"
          {...register("username")}
          error={!!errors.username}
          message={errors.username?.message}
        />
        <Input.LoginField
          id="password"
          label="Senha"
          icon={<Password className="h-20 w-20" />}
          placeholder="Digite sua senha"
          {...register("password")}
          error={!!errors.password}
          message={errors.password?.message}
        />
        <Button type="submit" label="Entrar" className="!bg-gray-200" />
      </form>
      <p className="max-w-224 text-center font-bold text-14">
        Caso não possua acesso, contate o administrador da sua empresa.
      </p>
      {isError && <p>Erro !!!!!!</p>}
      {/* <ModalErrorGeneric.Root
        defaultOpen={isError}
        onOpenChange={() =>
          location.state?.error && history.replaceState({}, "")
        }
      >
        <ModalErrorGeneric.Content
          title="Prezado cliente"
          description={
            "Não localizamos contrato em aberto para o documento informado."
          }
        />
      </ModalErrorGeneric.Root> */}
    </>
  );
};

const loginSchema = z.object({
  username: z.string().nonempty("O campo de usuário não pode estar vazio"),
  password: z.string().nonempty("O campo de senha não pode estar vazio"),
});
export type LoginFields = z.infer<typeof loginSchema>;
