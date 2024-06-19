import { zodResolver } from "@hookform/resolvers/zod";
import { Barcode, Info } from "@phosphor-icons/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button, Input, Loading } from "~/components";
import { useSearchMutation } from "~/hooks";

function NewSearchPage() {
  return (
    <main className="bg-gray-150 flex-1 text-white w-full ">
      <div className="container flex flex-col gap-48">
        <section className="flex gap-12 items-center py-12 border-b border-white">
          <Barcode size={48} />
          <article className="">
            <h1 className="text-24 font-semibold">Nova varredura</h1>
            <h2>Realizar nova procura</h2>
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
  const {
    mutate: newSearch,
    data,
    isSuccess,
    // isError,
    isPending,
  } = useSearchMutation();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<SearchFields>({ resolver: zodResolver(searchSchema) });

  const onSubmit = handleSubmit(
    async (fields) => {
      newSearch(fields);
      reset();
    },
    (error) => console.error(error)
  );

  useEffect(() => {
    if (isSuccess) {
      navigate(`/result/${data.searchId}`);
    }
  }, [isSuccess]);

  if (isPending) return <Loading />;

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
      <div className="flex w-full items-center gap-12">
        <fieldset className="flex gap-24">
          <label htmlFor="frequency" className="text-14 font-bold text-nowrap">Frequência de varredura</label>
          <div className="bg-gray-250 flex w-full rounded-12 px-12 gap-12">
            <div className="flex items-center gap-4">
              <input
                type="radio"
                id="frequency"
                value="unique"
                {...register("frequency")}
              />
              <span>Única</span>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                id="frequency"
                value="daily"
                {...register("frequency")}
              />
              <span>Diária</span>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                id="frequency"
                value="weekly"
                {...register("frequency")}
              />
              <span>Semanal</span>
            </div>
          </div>
        </fieldset>
        <fieldset className="flex gap-24 items-center w-full">
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
      <span className="w-full justify-end flex gap-12 text-14">
        <Info size={24} />
        Ao cadastrar uma nova varredura, notificações serão enviadas para o usuário via e-mail e sms.
      </span>

      <Button label="Realizar nova varredura" className="hover:bg-gray-800" />
    </form>
  );
};

const searchSchema = z.object({
  name: z.string().nonempty("Nome da varredura não pode ser vazio"),
  frequency: z.string().nonempty("Frequência não pode ser vazia"),
  content: z.string().nonempty("Conteúdo não pode ser vazio"),
});

export type SearchFields = z.infer<typeof searchSchema>;

export { NewSearchPage as Component };
