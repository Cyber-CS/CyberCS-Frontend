import { useQuery } from "@tanstack/react-query";
import { api } from "~/services";

interface Params {
  userId: string;
}

interface Response {
  name: string;
  registerDate: string;
  content: string;
  length: number;
}

export function useAlertsByUserQuery({ userId }: Params) {
  const query = useQuery({
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    queryKey: ["alertsByUser"],
    retry: false,
    queryFn: async () => {
      const { data, error, response } = await api.GET("/monitor-alerts", {
        params: {
          query: {
            userId,
          },
        },
      });
      if (data) {
        return data as Response[];
      }
      throw { error, code: response.status };
    },
  });

  return { ...query };
}
