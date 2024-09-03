import { useMutation } from "@tanstack/react-query";
import { api } from "~/services";

interface RegisterFields {
  username: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export function useRegisterMutation() {
  const mutation = useMutation({
    mutationFn: async ({ username, name, email, password, role }: RegisterFields) => {
      const { data, error, response } = await api.POST("/register", {
        body: {
          username,
          name,
          email,
          password,
          role, 
        },
      });
      if (data) return data;
      throw { error, code: response.status };
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return mutation;
}
