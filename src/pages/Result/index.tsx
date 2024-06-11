import { Flower, Info } from "@phosphor-icons/react";
import { useStorageData } from "~/hooks";
import { BitbucketLogo, GithubLogo } from "~/icons";
import { ResultData } from "~/types";

function ResultPage() {
  const { retrieveData } = useStorageData();
  const searchCookie = retrieveData("search");
  console.log("searchCookie ", searchCookie);
  const searchData = searchCookie
    ? (searchCookie.response as ResultData[])
    : [];
  return (
    <main className="bg-gray-700 flex-1 text-white w-full">
      <div className="container flex flex-col gap-48 py-32">
        <section className="flex gap-12 items-center py-12 border-b border-gray-100">
          <Flower size={48} />
          <article>
            <h1 className="text-24 font-semibold">Resultados de varredura</h1>
            <h2>{`${searchData.length}`} resultados encontrados</h2>
          </article>
        </section>
        <section className="w-full h-full bg-gray-200 rounded-8 p-24 flex flex-col gap-32">
          <article>
            <div className="flex md:items-center md:gap-32 mb-12 flex-col md:flex-row">
              <h2 className="text-24 font-bold">Resultados</h2>
              <span className="mt-4 flex items-center gap-12 bg-gray-50 text-black rounded-24 pl-4 pr-8 w-fit">
                <Info size={16} />
                <p className="text-12">
                  A varredura em questão estará destacada em cada arquivo
                  encontrado.
                </p>
              </span>
            </div>
            <div className="flex items-center px-20 py-12 bg-gray-500 rounded-12 mb-12">
              <p className="font-semibold">Localizado nos repositórios</p>
              <div className="flex gap-12 h-full px-12 items-center">
                {searchData.filter((data) =>
                  data.repositoryUrl.includes("bitbucket")
                ).length > 0 && <BitbucketLogo />}
                {searchData.filter((data) =>
                  data.repositoryUrl.includes("github")
                ).length > 0 && <GithubLogo />}
              </div>
            </div>
            <div className=" space-y-48">
              {searchData.map((data, index) => (
                <div className="bg-gray-700 p-12 rounded-12 " key={index}>
                  <h3 className="text-18 font-bold mb-12 flex gap-12 items-center">
                    <span>{index + 1}ª Ocorrência</span>
                    {data.repositoryUrl.includes("bitbucket") ? (
                      <BitbucketLogo />
                    ) : (
                      <GithubLogo />
                    )}
                  </h3>
                  <ul className="space-y-16 ">
                    <li className="bg-gray-50 rounded-8">
                      <h4 className=" flex gap-12 text-gray-900  p-12 border-b border-gray-700">
                        <span className="font-semibold">
                          Nome do repositório:
                        </span>
                        <span className="break-all">{data.repositoryName}</span>
                      </h4>
                      <h4 className="flex gap-12 text-gray-900 p-12">
                        <span className="font-semibold">Link:</span>
                        <span className="break-all">{data.repositoryUrl}</span>
                      </h4>
                    </li>

                    <li>
                      <h4 className="flex items-center gap-12 bg-gray-50 text-gray-900 rounded-8 rounded-b-none p-12">
                        <span className="font-bold ">Arquivo encontrado</span>
                        <span>
                          <code className="break-all">{data.filePath}</code>
                        </span>
                      </h4>
                      <div className="bg-gray-900 rounded-8 rounded-t-none p-12 text-14 overflow-y-auto max-h-[300px]">
                        <code>{data.codeContent}</code>
                      </div>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

export { ResultPage as Component };
