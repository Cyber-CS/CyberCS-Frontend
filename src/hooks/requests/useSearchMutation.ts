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
  name: string;
  frequency: string;
  content: string;
}

export function useSearchMutation() {
  const { saveData,retrieveData } = useStorageData();
  const mutation = useMutation({
    mutationKey: ["search"],
    mutationFn: async ({ name, frequency, content }: SearchFields) => {
      const { data, error, response } = await api.POST("/search", {
        body: {
          name,
          frequency,
          content,
        },
      });
      if (data) return data;
      throw { error, code: response.status };
    },
    onSuccess: (data) => {
        console.log("data ",data);
      saveData("search", data);
      console.log("oii ",retrieveData("search"));
    },
    onError: (error: ApiError) => {
      console.error(error);
    },
  });
  return mutation;
}
