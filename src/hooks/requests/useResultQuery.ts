import { useQuery } from "@tanstack/react-query";
import { api } from "~/services";

interface Params {
  searchId: string;
}

export function useResultQuery({ searchId }: Params) {
  const query = useQuery({
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    queryKey: ["result", searchId],
    retry: false,
    queryFn: async () => {
      const { data, error, response } = await api.GET("/result", {
        params: {
          query: {
            searchId,
          },
        },
      });
      if (data) {
        return data;
      }
      throw { error, code: response.status };
    },
  });

  return { ...query };
}
