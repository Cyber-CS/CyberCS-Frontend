import { zodResolver } from "@hookform/resolvers/zod";
import { Barcode, BellSimpleRinging, Info } from "@phosphor-icons/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button, Input, Loading } from "~/components";
import { useSearchMutation, useSendEmailNewSearchMutation } from "~/hooks";
import { useSession } from "~/session";

function AutomaticNewSearchPage() {
  return (
    <main className="bg-gray-150 flex-1 text-white w-full ">
      <div className="container flex flex-col gap-48">
        <section className="flex gap-12 items-center py-12 border-b border-white">
          <BellSimpleRinging size={48} />
          <article className="">
            <h1 className="text-24 font-semibold">
              Configurar nova varredura automática
            </h1>
            <h2>Crie uma nova varredura automática</h2>
          </article>
        </section>
        <section className="w-full h-full bg-gray-300 rounded-8 p-24">
          <SearchForm />
        </section>
      </div>
    </main>
  );
}

const SearchForm = () => {
  const navigate = useNavigate();
  const { user } = useSession();
  const {
    mutate: newSearch,
    data,
    isSuccess: isSuccessSearch,
    isError: isErrorSearch,
    isPending: isPendingSearch,
  } = useSearchMutation();
  const { mutate: sendEmail, isPending: isPendingSendEmail } =
    useSendEmailNewSearchMutation();

  const {
    register,
    setValue,
    getValues,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<SearchFields>({ resolver: zodResolver(searchSchema) });

  const onSubmit = handleSubmit(
    async (fields) => {
      newSearch(fields);
    },
    (error) => console.error(error)
  );

  useEffect(() => {
    setValue("userId", user.id as string);
    if (isSuccessSearch) {
      sendEmail({
        userEmail: user.email as string,
        userName: user.name as string,
        // content: getValues("content"),
        threats: [],
        searchName: getValues("name"),
      });
      navigate(`/result/${data.searchId}`);
    }
    if (isErrorSearch) {
      reset();
    }
  }, [isSuccessSearch, isErrorSearch]);

  if (isPendingSearch || isPendingSendEmail) return <Loading />;

  return (
    <form className="space-y-12 w-full flex flex-col" onSubmit={onSubmit}>
      <Input.SearchField
        id="name"
        label="Nome da varredura"
        placeholder="Digite o nome de registro de sua nova varredura"
        error={!!errors.name}
        message={errors.name?.message}
        {...register("name")}
      />
      <div className="flex flex-col lg:flex-row w-full lg:items-center gap-12">
        <fieldset className="flex gap-44 items-center w-full">
          <label htmlFor="filter" className="text-nowrap text-14 font-bold">
            Tipo de procura
          </label>
          <select
            id="filter"
            className="w-full p-12 rounded-8 bg-gray-250 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled
          >
            <option value="all">Selecione um</option>
          </select>
        </fieldset>
      </div>

      <Input.TextAreaField
        id="search-content"
        label="Insira sua pesquisa"
        error={!!errors.content}
        message={errors.content?.message}
        labelClassName="!items-start"
        inputClassName="!min-h-256 placeholder:-translate-y-108"
        {...register("content")}
      />
      <span className="w-full max-w-[70%] justify-end flex gap-12 text-14 self-end">
        <Info size={24} className="min-w-fit" />
        Esta é uma varredura manual, uma cópia dos resultados será enviado ao
        seu email. Para salvar resultados e enviar notificações, utilize a
        varredura automática.
      </span>

      <Button label="Realizar nova varredura" className="hover:bg-gray-800" />
    </form>
  );
};

const searchSchema = z.object({
  userId: z.string().nonempty("Usuário não pode ser vazio"),
  name: z.string().nonempty("Nome da varredura não pode ser vazio"),
  content: z.string().nonempty("Conteúdo não pode ser vazio"),
});

export type SearchFields = z.infer<typeof searchSchema>;

export { AutomaticNewSearchPage as Component };
