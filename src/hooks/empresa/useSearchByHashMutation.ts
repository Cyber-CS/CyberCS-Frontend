import { useMutation } from "@tanstack/react-query";
import { api } from "~/services";

interface SearchResult {
  filePath: string;
  codeContent: string;
  repositoryName: string;
  repositoryUrl: string;
  foundIn: string;
}

interface SearchByHashResult {
  searchId: string;
  content: string;
  response: SearchResult[];
  foundIn: string[];
}

interface SaveSearchData {
  userId: string;  // Adicione o userId aqui, se necessário
  name: string;    // Nome da busca (pode ser um valor fixo ou derivado)
  content: string; // Conteúdo da busca (hash, etc.)
  results: SearchResult[];
}

interface SearchByHashData {
  empresaId: string;
  hash: string;
}

export function useSearchByHashMutation() {
  const mutation = useMutation<SearchByHashResult, Error, SearchByHashData>({
    mutationFn: async ({ empresaId, hash }) => {
      const { data, error } = await api.POST("/search-by-hash", {
        body: { empresaId, hash },
      });

      if (data) {
        return data as SearchByHashResult;
      }
      throw new Error(error?.message || "Erro desconhecido");
    },
    onError: (error) => {
      console.error("Erro ao realizar busca por hash:", error);
    },
    onSuccess: async (data) => {
      console.log("Busca por hash realizada com sucesso:", data);
      // Chame a mutação para salvar a pesquisa aqui
      const saveSearchData: SaveSearchData = {
        userId: "user_id_example", // Substitua pelo ID do usuário apropriado
        name: "Search for hash: " + data.content, // Nome da busca
        content: data.content, // Ou qualquer outro conteúdo relevante
        results: data.response, // Resultados da busca
      };

      try {
        await api.POST("/save-search", { body: saveSearchData });
        console.log("Busca salva com sucesso.");
      } catch (error) {
        console.error("Erro ao salvar busca:", error);
      }
    },
  });

  return mutation;
}
