import { useQuery } from "@tanstack/react-query";
import { api } from "~/services";

interface Params {
  userId: string;
}

interface Results {
  searchId: string;
  searchType: "manual" | "automatica";
  name: string;
  content: string;
  length: number;
  registerDate: string;
  foundIn: string[];
}

export function useResultsByUserQuery({ userId }: Params) {
  const query = useQuery({
    refetchOnWindowFocus: false,
    refetchOnMount: "always",
    queryKey: ["manualResultsByUser", userId],
    retry: false,
    queryFn: async () => {
      const { data, error, response } = await api.GET("/manual-results-by-user", {
        params: {
          query: {
            userId,
          },
        },
      });
      if (data) return data as unknown as Results[];
      throw { error, code: response.status };
    },
  });

  return { ...query };
}
