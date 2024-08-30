import { useQuery } from "@tanstack/react-query";
import { api } from "~/services";

interface Params {
  userId: string;
}

interface Results {
  searchId: string;
  name: string;
  content: string;
  length: number;
  registerDate: string;
}

export function useResultsByUserQuery({ userId }: Params) {
  const query = useQuery({
    refetchOnWindowFocus: false,
    refetchOnMount: "always",
    queryKey: ["resultsByUser", userId],
    retry: false,
    queryFn: async () => {
      const { data, error, response } = await api.GET("/results-by-user", {
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

import { useQuery } from "@tanstack/react-query";
import { api } from "~/services";

interface Params {
  userId: string;
}

interface Response {
  name: string;
  username: string;
  phoneNumber: string;
  email: string;
  role: string;
}

export function useGetAllUsersQuery() {
  const query = useQuery({
    refetchOnWindowFocus: false,
    refetchOnMount: "always",
    queryKey: ["allUsers"],
    retry: false,
    queryFn: async () => {
      const { data, error, response } = await api.GET("/all-users", {});
      if (data) return data as unknown as Results[];
      throw { error, code: response.status };
    },
  });

  return { ...query };
}
