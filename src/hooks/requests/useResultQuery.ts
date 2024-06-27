import { useQuery } from "@tanstack/react-query";
import { api } from "~/services";

interface Params {
  searchId: string;
}

interface Result {
  content: string;
  filters: string[];
  frequency: string;
  name: string;
  registerDate: string;
  response: string[];
  _id: string;
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
        return data as Result;
      }
      throw { error, code: response.status };
    },
  });

  return { ...query };
}
