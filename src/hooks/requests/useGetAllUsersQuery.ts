import { useQuery } from "@tanstack/react-query";
import {api} from "~/services";

interface Response {
    _id: string;
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
        if (data) return data as unknown as Response[];
        throw { error, code: response.status };
      },
    });
  
    return { ...query };
  }