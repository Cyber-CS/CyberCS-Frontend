import { useMutation } from "@tanstack/react-query";
import { api } from "~/services";

interface DeleteFields {
  userId: string;
}

export function useDeleteMutation() {
  const mutation = useMutation({
    mutationFn: async ({ userId }: DeleteFields) => {
      const { data, error, response } = await api.DELETE(`/users/${userId}`);
      if (data) return data;
      throw { error, code: response.status };
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return mutation;
}
