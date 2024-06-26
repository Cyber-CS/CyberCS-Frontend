import {
  ArrowsOutSimple,
  FileDashed,
  Flower,
  IdentificationCard,
  Info,
  Link as LinkIcon,
} from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";
import { Loading } from "~/components";
import { useResultQuery } from "~/hooks";
import { BitbucketLogo, GithubLogo } from "~/icons";
import CryptoJS from "crypto-js";

type SearchDataProps = {
  repositoryName: string;
  repositoryUrl: string;
  filePath: string;
  codeContent: string;
  maliciousIntent: { match: string; description: string }[];
};

function ResultPage() {
  const pathname = useLocation();
  const id = pathname.pathname.split("/")[2];
  function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  const { data: dataResult, isFetching: isFetchingResult } = useResultQuery({
    searchId: id,
  });

  const decryptArray = (encryptedData: string, secretKey: string) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedString);
  };

  const searchData = (
    dataResult ? decryptArray(dataResult.response[0], "a") : []
  ) as SearchDataProps[];

  if (isFetchingResult) return <Loading />;

  return (
    <main className="bg-gray-150 flex-1 text-white w-full">
      <div className="container flex flex-col gap-48 py-32">
        <section className="flex gap-12 items-center py-12 border-b border-white">
          <Flower size={48} />
          <article>
            <h1 className="text-24 font-semibold">Resultados de varredura</h1>
            <h2>{`${searchData.length} `} resultados encontrados</h2>
          </article>
        </section>
        <section className="w-full h-full bg-gray-100 rounded-8 p-24 flex flex-col gap-32">
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
            <h3 className="text-14 mb-12 space-x-8">
              <span>Resultados para string: </span>
              <span className="text-18 break-all font-semibold">
                {dataResult?.content}
              </span>
            </h3>
            <div className="flex items-center px-20 py-12 bg-gray-50 rounded-12 mb-12">
              {searchData.length > 0 ? (
                <>
                  <p className="font-semibold text-gray-700">
                    Localizado nos repositórios
                  </p>
                  <div className="flex gap-12 h-full px-12 items-center">
                    {searchData.filter((data) =>
                      data.repositoryUrl.includes("bitbucket")
                    ).length > 0 && <BitbucketLogo />}
                    {searchData.filter((data) =>
                      data.repositoryUrl.includes("github")
                    ).length > 0 && <GithubLogo />}
                  </div>
                </>
              ) : (
                <p className="font-semibold">
                  Nenhum arquivo ou vazamento foi encontrado para a sua busca
                </p>
              )}
            </div>
            <div className=" space-y-48">
              {searchData.map((data, index) => {
                let replacedContent = data.codeContent;
                replacedContent = replacedContent.replace(
                  new RegExp(escapeRegExp(dataResult?.content as string), "g"),
                  `<span class="!bg-blue-300 text-white">${dataResult?.content}</span>`
                );
                data.maliciousIntent.map((intent, index) => {
                  const match = (intent.match as string) || "";
                  replacedContent = replacedContent.replace(
                    new RegExp(escapeRegExp(match), "g"),
                    `<span class="bg-red-500 text-white"><span class="!bg-orange-300"> ${index + 1}.</span> ${match}</span>`
                  );
                });
                return (
                  <div className="bg-gray-600 p-12 rounded-12 " key={index}>
                    <h3 className="text-18 font-bold mb-12 flex gap-12 items-center">
                      <span>{index + 1}ª Ocorrência</span>
                      {data.repositoryUrl.includes("bitbucket") ? (
                        <BitbucketLogo />
                      ) : (
                        <GithubLogo className="w-100" />
                      )}
                    </h3>
                    <ul className="space-y-16 ">
                      <li className="bg-gray-50 rounded-8">
                        <div className=" flex gap-8 text-gray-900 p-12 border-b border-gray-700">
                          <IdentificationCard size={24} />
                          <div className="flex gap-8">
                            <p className="font-semibold">
                              Nome do repositório:
                            </p>
                            <h4 className="break-all">{data.repositoryName}</h4>
                          </div>
                        </div>
                        <div className="flex gap-8 text-gray-900 p-12 border-b border-gray-700">
                          <div className="flex gap-8">
                            <LinkIcon size={24} />
                            <span className="font-semibold">Link:</span>
                            <span className="break-all">
                              {data.repositoryUrl}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-12 text-gray-900 p-12 ">
                          <p className="font-semibold">
                            Tipo de ameaças encontradas:
                          </p>
                          <ul className="space-y-4">
                            {data.maliciousIntent.map((intent, index) => {
                              return (
                                <li
                                  key={index}
                                  className="border font-semibold text-gray-700 border-orange-300 px-12 py-2 rounded-8 break-all w-fit"
                                >
                                  {index + 1}º {intent.description}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </li>

                      <li>
                        <div className="flex justify-between bg-gray-50 text-gray-900 rounded-8 rounded-b-none p-12">
                          <div className="flex">
                            <FileDashed size={24} className="mr-4" />
                            <p className="font-bold mr-12">
                              Arquivo encontrado
                            </p>
                            <h4>
                              <code className="break-all">{data.filePath}</code>
                            </h4>
                          </div>
                          <ArrowsOutSimple size={24} />
                        </div>

                        <div className="bg-gray-900 rounded-8 rounded-t-none p-12 text-14 overflow-y-auto max-h-[300px]">
                          <pre>
                            <code
                              dangerouslySetInnerHTML={{
                                __html: replacedContent,
                              }}
                            />
                          </pre>
                        </div>
                      </li>
                    </ul>
                  </div>
                );
              })}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

export { ResultPage as Component };
