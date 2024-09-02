import { useMutation } from "@tanstack/react-query";
import { api } from "~/services";
import { useStorageData } from "../useStorageData";
interface ApiError {
  code: number;
  error: {
    code: string;
    message: string;
  };
}

interface SearchFields {
  userId: string;
  name: string;
  content: string;
}

export function useSearchMutation() {
  const { saveData } = useStorageData();
  const mutation = useMutation({
    mutationKey: ["search"],
    mutationFn: async ({ userId, name, content }: SearchFields) => {
      const { data, error, response } = await api.POST("/search", {
        body: {
          userId,
          name,
          content,
        },
      });
      if (data) return data;
      throw { error, code: response.status };
    },
    onSuccess: (data) => {
      saveData("search", data);
    },
    onError: (error: ApiError) => {
      console.error(error);
    },
  });
  return mutation;
}
