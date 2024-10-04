import { useMutation } from "@tanstack/react-query";
import { api } from "~/services";
interface ApiError {
  code: number;
  error: {
    code: string;
    message: string;
  };
}

interface SendEmailNewSearchFields {
  userEmail: string;
  userName: string;
  searchName: string;
  threats: {
    name: string;
    description: string;
    link: String;
  }[];
}

export function useSendEmailNewSearchMutation() {
  const mutation = useMutation({
    mutationKey: ["sendEmailNewSearch"],
    mutationFn: async ({
      userEmail,
      userName,
      searchName,
      threats,
    }: SendEmailNewSearchFields) => {
      const response = await fetch(
        "http://localhost:5000/send-email-new-search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to_email: "suelengbr@gmail.com",
            user_name: userName,
            search_name: searchName,
            threats: [
              {
                name: "Threat",
                description: "Description",
                link: "Link",
              },
              {
                name: "Threat2",
                description: "Description2",
                link: "https://www.google.com",
              },
              {
                name: "Threat3",
                description: "Description3",
                link: "https://www.google.com",
              },
            ],
          }),
        }
      );

      const data = await response.json();

      if (response.ok) return data;
      throw { error: data, code: response.status };
    },
    onError: (error: ApiError) => {
      console.error(error);
    },
  });

  return mutation;
}
