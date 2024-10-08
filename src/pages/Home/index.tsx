import {
  AppWindow,
  Gear,
  Fingerprint,
  ShieldCheck,
  UserCircle,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { Button, Loading } from "~/components";
import { useAlertsByUserQuery, useResultsByUserQuery } from "~/hooks";
import { useSession } from "~/session";

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useSession();

  const { data, isLoading } = useResultsByUserQuery({
    userId: user.id as string,
  });

  const { data: dataAlerts, isLoading: isLoadingAlerts } = useAlertsByUserQuery(
    {
      userId: user.id as string,
    }
  );

  if (isLoading || isLoadingAlerts) return <Loading />;

  return (
    <main className="bg-gray-150 flex-1 text-white w-full ">
      <div className="container flex flex-col gap-48">
        <section className="w-full flex gap-12 items-center py-12 border-b border-white">
          <AppWindow size={48} />
          <article>
            <h1 className="text-24 font-semibold">Home</h1>
            <h2>
              Bem-vindo de volta,{" "}
              <span className="capitalize font-semibold text-20">
                {`${user?.name?.toLocaleLowerCase()}`}.
              </span>
            </h2>
          </article>
        </section>
        <section className="flex flex-wrap gap-32">
          <article className="flex flex-col bg-[#c8c3cd] rounded-12 p-12 w-full min-h-[200px] border border-gray-800/20">
            <div className="flex font-semibold text-20 text-gray-700 gap-4 mb-8 items-center">
              <p className="mr-4">Suas varreduras manuais mais recentes</p>
              {data?.length && (
                <span className=" py-2 px-8 rounded-4 bg-gray-200 text-white text-14 h-fit">
                  {`${data.length} buscas feitas`}
                </span>
              )}
              {data && data.length > 3 && (
                <span className=" py-2 px-8 rounded-4 bg-gray-200 text-white text-14 h-fit">
                  Mostrando apenas as 3 mais recentes
                </span>
              )}
            </div>
            {!data ? (
              <p className="text-gray-600">Nenhuma busca ainda feita</p>
            ) : (
              <ul className="border border-gray-300 rounded-12 px-8 bg-gray-100/30 text-white">
                {data
                  .slice(0, 3)
                  .map(
                    (
                      { name, content, registerDate, searchType, length },
                      index
                    ) => (
                      <ManualSearchItem
                        key={index}
                        name={name}
                        content={content}
                        registerDate={registerDate}
                        searchType={searchType}
                        length={length}
                      />
                    )
                  )}
              </ul>
            )}

            <div className="mt-auto flex gap-12">
              <Button
                label="Ver mais no perfil"
                onClick={() => navigate("/profile")}
              />
              <Button
                label="Fazer nova busca"
                onClick={() => navigate("/new-search")}
              />
            </div>
          </article>
          <div className="flex w-full gap-48">
            <article className="bg-[#d7c5c5] rounded-12 p-12 w-full min-h-[200px] border border-gray-800/20">
              <h3 className="font-semibold text-20 text-gray-700">
                Alertas de vazamentos detectados
              </h3>
              {dataAlerts?.map(({ name, registerDate, length }, index) => {
                if (dataAlerts.length === 0)
                  return (
                    <p className="text-gray-600">
                      Nenhum alerta de vazamento detectado
                    </p>
                  );
                return (
                  <MaliciusWarningItem
                    key={index}
                    name={name}
                    registerDate={registerDate}
                    length={length}
                  />
                );
              })}
            </article>
            <article className="flex flex-col bg-[#d7e6d7] rounded-12 p-12 w-full min-h-[200px] border border-gray-800/20">
              <h3 className="font-semibold text-20 text-gray-700">
                Varreduras automáticas configuradas
              </h3>
              {data?.map(
                (
                  { name, content, registerDate, searchType, length },
                  index
                ) => (
                  <AutomaticSearchItem
                    key={index}
                    name={name}
                    content={content}
                    registerDate={registerDate}
                    searchType={searchType}
                    length={length}
                  />
                )
              )}
              {/* <p className="text-gray-600">
                Nenhuma varredura automática configurada
              </p> */}
              <Button
                className="mt-auto"
                label="Criar nova varredura automática"
                onClick={() => navigate("/automatic-new-search")}
              />
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}

const ManualSearchItem = ({
  name,
  content,
  registerDate,
  length,
}: {
  name: string;
  content: string;
  registerDate: string;
  searchType: string;
  length: number;
}) => {
  return (
    <li className="border-b border-gray-300 flex gap-12 py-8 flex-wrap last:border-none">
      <div className="space-x-12 bg-gray-300 px-8 rounded-8">
        <span className="font-semibold text-16">Nome: {name}</span>
      </div>
      <div className="space-x-12 bg-gray-300 px-8 rounded-8">
        <span className="font-semibold text-16">String buscada: {content}</span>
      </div>
      <div className="space-x-12 bg-gray-300 px-8 rounded-8">
        <span className="font-semibold text-16">
          Data: {new Date(registerDate).toLocaleString()}
        </span>
      </div>
      <div className="space-x-12 bg-gray-300 px-8 rounded-8">
        <span className="font-semibold text-16">Resultados: {length}</span>
      </div>
    </li>
  );
};

const AutomaticSearchItem = ({
  name,
  content,
  registerDate,
  length,
}: {
  name: string;
  content: string;
  registerDate: string;
  searchType: string;
  length: number;
}) => {
  return (
    <li className="border-b border-gray-300 flex gap-12 py-8 flex-wrap last:border-none">
      <div className="space-x-12 bg-gray-300 px-8 rounded-8">
        <span className="font-semibold text-16">Nome: {name}</span>
      </div>
      <div className="space-x-12 bg-gray-300 px-8 rounded-8">
        <span className="font-semibold text-16">String buscada: {content}</span>
      </div>
      <div className="space-x-12 bg-gray-300 px-8 rounded-8">
        <span className="font-semibold text-16">
          Data: {new Date(registerDate).toLocaleString()}
        </span>
      </div>
      <div className="space-x-12 bg-gray-300 px-8 rounded-8">
        <span className="font-semibold text-16">Resultados: {length}</span>
      </div>
      <div className="space-x-12 bg-[#406db9]/50 px-8 rounded-8">
        <span className="font-semibold text-16 ">
          Alertas novos: <b>0</b>
        </span>
      </div>
    </li>
  );
};

const MaliciusWarningItem = ({
  name,
  registerDate,
  length,
}: {
  name: string;
  registerDate: string;
  length: number;
}) => {
  return (
    <li className="border-b border-gray-300 flex gap-12 py-8 items-center last:border-none">
      <p className="bg-red-500 text-white px-4 py-2 rounded-8">Crítico</p>
      <div className="space-x-12 bg-gray-300 px-8 rounded-8">
        <span className="font-semibold text-16">
          {length} alertas para a busca "{name}"
        </span>
      </div>

      <div className="space-x-12 bg-gray-300 px-8 rounded-8">
        <span className="font-semibold text-16">
          Data: {new Date(registerDate).toLocaleString()}
        </span>
      </div>
    </li>
  );
};
