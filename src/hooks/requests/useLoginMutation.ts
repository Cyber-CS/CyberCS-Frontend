import { useMutation } from "@tanstack/react-query";
import { useSession } from "~/session";
import { api } from "~/services";
interface ApiError {
  code: number;
  error: {
    code: string;
    message: string;
  };
}

interface LoginFields {
  username: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
}
export function useLoginMutation() {
  const { setAccessToken } = useSession();
  const mutation = useMutation({
    mutationFn: async ({ username, password }: LoginFields) => {
      const { data, error, response } = await api.POST("/login", {
        body: {
          username,
          password
        },
      });
      if (data) return data;
      throw { error, code: response.status };
    },
    onSuccess: (data) => {
      console.log("oii",data);
      setAccessToken((data as AuthResponse).access_token)},
    onError: (error) => {
      console.error(error);
    },
  });
  return mutation;
}
