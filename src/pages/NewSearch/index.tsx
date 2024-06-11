import { zodResolver } from "@hookform/resolvers/zod";
import { Barcode, Info } from "@phosphor-icons/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button, Loading } from "~/components";
import { useSearchMutation } from "~/hooks";

function NewSearchPage() {
  return (
    <main className="bg-gray-700 flex-1 text-white w-full ">
      <div className="container flex flex-col gap-48">
        <section className="flex gap-12 items-center py-12 border-b border-gray-100">
          <Barcode size={48} />
          <article className="">
            <h1 className="text-24 font-semibold">Nova varredura</h1>
            <h2>Realizar nova procura</h2>
          </article>
        </section>
        <section className="w-full h-full bg-gray-200 rounded-8 p-24">
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
    isError,
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
      navigate(`/result/${data.id}`);
    }
  }, [isSuccess]);

  if (isPending) return <Loading />;

  return (
    <form className="space-y-12 w-full flex flex-col" onSubmit={onSubmit}>
      <fieldset className="flex gap-24 items-center">
        <label className="text-nowrap" htmlFor="name">
          Nome da varredura
        </label>
        <input
          type="text"
          id="name"
          className="w-full p-12 rounded-8 bg-gray-500 placeholder:text-gray-50"
          placeholder="Digite o nome de registro de sua nova varredura"
          {...register("name")}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="frequency">Frequência</label>
        <input
          type="radio"
          id="frequency"
          value="daily"
          {...register("frequency")}
        />
        <span>Diária</span>
        <input
          type="radio"
          id="frequency"
          value="weekly"
          {...register("frequency")}
        />
        <span>Semanal</span>
        <input
          type="radio"
          id="frequency"
          value="unique"
          {...register("frequency")}
        />
        <span>única</span>
      </fieldset>
      <fieldset className="flex gap-24 items-start">
        <label className="text-nowrap" htmlFor="search-content">
          Insira sua pesquisa:
        </label>
        <textarea
          id="search-content"
          className="w-full min-h-148 max-h-148 p-12 rounded-8 bg-gray-500 placeholder:text-gray-50"
          placeholder="Digite o conteúdo a ser procurado"
          {...register("content")}
        />
      </fieldset>
      <span className="w-full justify-end flex gap-12">
        <Info size={24} />
        Será enviado notificações ${`{diárias}`} para o email e sms cadastrados.
      </span>

      <Button label="Realizar nova varredura" />
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
