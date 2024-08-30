import { ArrowRight, Barcode, Envelope, User } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { Loading } from "~/components";
import { useResultsByUserQuery } from "~/hooks";
import { GithubLogo } from "~/icons";
import { useSession } from "~/session";

function ProfilePage() {
  const { user } = useSession();
  const { data, isLoading } = useResultsByUserQuery({
    userId: user.id as string,
  });
  const ProfileImg =
    "https://s3.glbimg.com/v1/AUTH_35862ca5c6ab48b992baf1f1b4f7062e/m-extra-globo-com/incoming/25424102-725-1ff/w488h275-PROP/97960174_brazils-president-jair-bolsonaro-puts-on-a-pink-tie-after-taking-of-his-blue-tie-durin.jpg";

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
      content: "tst@gmail.com",
    },
  ];

  if (isLoading) return <Loading />;

  return (
    <main className="bg-gray-150 flex-1 text-white w-full flex">
      <section className="container flex flex-col">
        <article className="flex w-full justify-between">
          <div className="max-h-[85px] w-full flex gap-12 items-center py-12 border-b border-white ">
            <User size={48} />
            <article>
              <h1 className="text-24 font-semibold">Perfil</h1>
              <h2>Informações sobre o usuário</h2>
            </article>
          </div>
          <div
            style={{
              backgroundImage: `url(${ProfileImg})`,
            }}
            className="bg-cover bg-center min-w-112 h-112 rounded-full mt-8"
          />
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
          <ul className="bg-gray-50 rounded-8">
            {data?.map(({ searchId, content, length, name, registerDate }) => (
              <li className="border-b p-12">
                <ul className="flex flex-col items-center  lg:flex-row text-black">
                  <li className="w-full flex flex-col lg:flex-row gap-12">
                    <p className="flex flex-col leading-normal">
                      <span className="font-semibold">Nome da varredura</span>
                      <span>{name}</span>
                    </p>
                    <p className="flex flex-col leading-normal">
                      <span className="font-semibold">String buscada</span>
                      <span>{content}</span>
                    </p>
                    <p className="flex flex-col leading-normal">
                      <span className="font-semibold">
                        Resultados encontrados
                      </span>
                      <span>
                        {length === 1 ? "Nenhum resultado encontrado" : length}
                      </span>
                    </p>
                    <p className="flex flex-col leading-normal">
                      <span className="font-semibold">
                        Encontrado no(s) repositório(s)
                      </span>
                      <GithubLogo className="w-64" />
                    </p>
                  </li>
                  <Link
                    to={`/result/${searchId}`}
                    className="lg:ml-auto flex gap-12 h-fit w-fit  items-center bg-gray-400 rounded-12 px-24 py-8 text-white font-medium"
                  >
                    <p className="text-nowrap">Ver detalhes</p>
                    <ArrowRight size={20} weight="bold" />
                  </Link>
                </ul>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}

export { ProfilePage as Component };
