import { useMutation } from '@tanstack/react-query';
import { api } from '~/services';

interface UpdateEmpresaFields {
  id: string;
  name: string;
  hash: string; // Mude de hashes para um hash único
}

export function useUpdateEmpresaMutation() {
  return useMutation({
    mutationFn: async ({ id, name, hash }: UpdateEmpresaFields) => {
      const { data, error, response } = await api.PUT(`/empresas/edit/${id}`, {
        body: { name, hash }, // Alterando para hash único
      });
      if (data) return data;
      throw { error, code: response.status };
    },
    onError: (error) => {
      console.error('Erro ao atualizar empresa:', error);
    },
  });
}
