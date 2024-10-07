import { zodResolver } from "@hookform/resolvers/zod";
import { BellSimpleRinging, Info } from "@phosphor-icons/react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { cx } from "class-variance-authority";
import { useEffect, useRef } from "react";
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
  const dataBaseRef = useRef<HTMLInputElement>(null);
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

  const periodicityValues = [
    {
      text: "Diária",
      value: "everyday",
    },
    {
      text: "Semanal",
      value: "weekly",
    },
    {
      text: "Mensal",
      value: "monthly",
    },
  ];

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

      <fieldset className="flex gap-12 items-center w-fit self-end">
        <label htmlFor="filter" className="text-14 font-bold">
          Qual a periodicidade da varredura?
        </label>
        <ToggleGroup.Root
          className="flex"
          type="single"
          defaultValue="Diária"
          aria-label="Periodicidade"
          onValueChange={(value) => setValue("periodicity", value)}
        >
          {periodicityValues.map(({ text, value }, index) => (
            <ToggleGroup.Item
              key={index}
              className={cx([
                "w-72 flex items-center justify-center",
                "transition-colors duration-200",
                "bg-white hover:bg-gray-30",
                "focus:outline-none data-[state=on]:bg-gray-50 data-[state=on]:font-medium",
                "first:rounded-l-8 last:rounded-r-8",
              ])}
              value={value}
              aria-label={text}
            >
              <p className="text-black">{text}</p>
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </fieldset>

      <Input.TextAreaField
        id="search-content"
        label="Insira sua pesquisa"
        error={!!errors.content}
        message={errors.content?.message}
        labelClassName="!items-start"
        inputClassName="!min-h-256 placeholder:-translate-y-108"
        {...register("content")}
      />
      <div className="flex flex-col lg:flex-row w-full lg:items-center gap-12">
        <fieldset className="flex gap-44 items-center w-full">
          <label htmlFor="filter" className="w-full text-14 font-bold">
            Gostaria de nos enviar um banco de dados ou usar um já existente
            para melhorar a precisão de relacionamento de possíveis vazamentos
            aos seus dados?
          </label>
          <input
            ref={dataBaseRef}
            type="file"
            id="database"
            className="hidden"
          />
          <div className="flex gap-12">
            <Button
              label="Enviar banco de dados"
              onClick={() => dataBaseRef.current?.click()}
            />
            <Button label="Usar banco de dados já existente" />
          </div>
          {/* pposso usar um banco de dados ja salvo também */}
          {/* <select
            id="filter"
            className="w-full p-12 rounded-8 bg-gray-250 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled
          >
            <option value="all">Selecione um</option>
          </select> */}
        </fieldset>
      </div>
      <span className="w-full max-w-[70 flex gap-12 text-14">
        <Info size={24} className="min-w-fit" />
        Esta é uma varredura automática, sua pesquisa estará disponível na área
        de varreduras e poderá ser desativada a qualquer momento.
      </span>

      <Button label="Realizar nova varredura" />
    </form>
  );
};

const searchSchema = z.object({
  userId: z.string().nonempty("Usuário não pode ser vazio"),
  name: z.string().nonempty("Nome da varredura não pode ser vazio"),
  content: z.string().nonempty("Conteúdo não pode ser vazio"),
  periodicity: z.string().nonempty("Periodicidade não pode ser vazio"),
});

export type SearchFields = z.infer<typeof searchSchema>;

export { AutomaticNewSearchPage as Component };
