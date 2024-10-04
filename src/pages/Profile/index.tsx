import {
  ArrowRight,
  Barcode,
  Envelope,
  GitlabLogo,
  User,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { Loading } from "~/components";
import { useResultsByUserQuery } from "~/hooks";
import { BitbucketLogo, GithubLogo } from "~/icons";
import { useSession } from "~/session";

function ProfilePage() {
  const { user } = useSession();
  const { data, isLoading } = useResultsByUserQuery({
    userId: user.id as string,
  });

  const pageInfos = [
    {
      icon: <Barcode size={48} />,
      title: "Código",
      content: user.id,
    },
    {
      icon: <User size={48} />,
      title: "Nome",
      content: user.name,
    },
    {
      icon: <Envelope size={48} />,
      title: "Email",
      content: user.email,
    },
  ];

  if (isLoading) return <Loading />;

  return (
    <main className="bg-gray-150 flex-1 text-white w-full">
      <section className="container flex flex-col">
        <article className="flex w-full justify-between">
          <div className="max-h-[85px] w-full flex gap-12 items-center py-12 border-b border-white mb-24">
            <User size={48} />
            <article>
              <h1 className="text-24 font-semibold">Perfil</h1>
              <h2>Informações sobre o usuário</h2>
            </article>
          </div>
        </article>
        <ul className="space-y-24 mb-32">
          {pageInfos.map(({ icon, title, content }, index) => (
            <li key={index} className="flex gap-12 items-center">
              {icon}
              <div>
                <h3 className="font-bold text-18">{title}</h3>
                <p className="font-medium text-16">{content}</p>
              </div>
            </li>
          ))}
        </ul>
        <article>
          <h3 className="text-28 font-bold">Buscas recentes do usuário</h3>
          <ul className=" rounded-8">
            {data?.length !== 0 ? (
              data?.map(
                ({
                  searchId,
                  content,
                  length,
                  name,
                  registerDate,
                  foundIn,
                }) => (
                  <li className="border-b py-12 last:border-none">
                    <ul className="flex gap-48 bg-gray-50 p-4 rounded-8 flex-col lg:flex-row text-black">
                      <li className="w-full flex flex-col lg:flex-row gap-12">
                        <div className="flex flex-col leading-normal w-full">
                          <TitleBadge title="Nome da varredura" />
                          <span className=" ">{name}</span>
                        </div>
                        <div className="flex flex-col leading-normal w-full">
                          <TitleBadge title="String buscada" />
                          <span>{content}</span>
                        </div>
                        <div className="flex flex-col leading-normal w-full">
                          <TitleBadge title="Data de varredura" />
                          <span>
                            {new Date(registerDate).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                        <div className="flex flex-col leading-normal w-full">
                          <TitleBadge title="Resultados encontrados" />
                          <span>
                            {!length ? "Nenhum resultado encontrado" : length}
                          </span>
                        </div>
                        <div className="flex flex-col leading-normal w-full">
                          <TitleBadge title="Encontrado em" />
                          <>
                            {foundIn.map((item) => (
                              <>
                                {item === "github" && (
                                  <GithubLogo className="w-64" />
                                )}
                                {item === "gitlab" && (
                                  <GitlabLogo className="w-64" />
                                )}
                                {item === "bitbucket" && (
                                  <BitbucketLogo className="w-64" />
                                )}
                              </>
                            ))}
                          </>
                        </div>
                      </li>
                      <button className="max-lg:mt-16">
                        <Link
                          to={`/result/${searchId}`}
                          className="text-nowrap lg:ml-auto flex gap-12 h-fit w-fit items-center bg-gray-400 rounded-12 px-24 py-8 text-white font-medium"
                        >
                          Ver detalhes
                          <ArrowRight size={20} weight="bold" />
                        </Link>
                      </button>
                    </ul>
                  </li>
                )
              )
            ) : (
              <li className="py-12">
                <TitleBadge title="Nenhuma busca encontrada" />
              </li>
            )}
          </ul>
        </article>
      </section>
    </main>
  );
}

const TitleBadge = ({ title }: { title: string }) => (
  <span className="font-semibold bg-gray-400 text-white py-2 px-8 rounded-4 max-lg:w-fit">
    {title}
  </span>
);

export { ProfilePage as Component };
