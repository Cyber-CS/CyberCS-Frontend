import { Barcode, Info } from "@phosphor-icons/react";
import { Button } from "~/components";

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
          <form className="space-y-12 w-full flex flex-col">
            <fieldset className="flex gap-24 items-center">
              <label className="text-nowrap" htmlFor="name">
                Nome da varredura
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-12 rounded-8 bg-gray-500 placeholder:text-gray-50"
                placeholder="Digite o nome de registro de sua nova varredura"
              />
            </fieldset>
            <fieldset>
              <label htmlFor="frequency">Frequência</label>
              <input
                type="radio"
                id="frequency"
                name="frequency"
                value="daily"
              />
              <span>Diária</span>
              <input
                type="radio"
                id="frequency"
                name="frequency"
                value="weekly"
              />
              <span>Semanal</span>
              <input
                type="radio"
                id="frequency"
                name="frequency"
                value="unique"
              />
              <span>única</span>
            </fieldset>
            <fieldset className="flex gap-24 items-start">
              <label className="text-nowrap" htmlFor="search-content">
                Insira sua pesquisa:
              </label>
              <textarea
                id="search-content"
                name="search-content"
                className="w-full min-h-148 max-h-148 p-12 rounded-8 bg-gray-500 placeholder:text-gray-50"
                placeholder="Digite o conteúdo a ser procurado"
              />
            </fieldset>
            <span className="w-full justify-end flex gap-12">
              <Info size={24} />
              Será enviado notificações ${`{diárias}`} para o email e sms
              cadastrados.
            </span>

            <Button label="Realizar nova varredura" />
          </form>
        </section>
      </div>
    </main>
  );
}

export { NewSearchPage as Component };
