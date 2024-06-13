import { zodResolver } from "@hookform/resolvers/zod";
import { Password, User } from "@phosphor-icons/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button, Input, Loading } from "~/components";
import { ModalErrorGeneric } from "~/components/Dialog";
import { useLoginMutation } from "~/hooks";

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
          type="password"
        />
        <Button type="submit" label="Entrar" className="!bg-gray-200" />
      </form>

      <ModalErrorGeneric.Root
        defaultOpen={isError}
        onOpenChange={() => history.replaceState({}, "")}
      >
        <ModalErrorGeneric.Content
          title="Erro ao localizar usuário"
          description={
            "Não foi possível localizar o usuário informado.Tente novamente ou entre em contato com o administrador."
          }
        />
      </ModalErrorGeneric.Root>
    </>
  );
};

const loginSchema = z.object({
  username: z.string().nonempty("O campo de usuário não pode estar vazio"),
  password: z.string().nonempty("O campo de senha não pode estar vazio"),
});
export type LoginFields = z.infer<typeof loginSchema>;
