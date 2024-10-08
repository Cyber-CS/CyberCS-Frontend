import { useMutation } from '@tanstack/react-query';
import { api } from '~/services';
import { useGetAllEmpresasQuery } from './useGetAllEmpresasQuery';

interface DeleteEmpresaFields {
  id: string;
}

export function useDeleteEmpresaMutation() {
  const { refetch } = useGetAllEmpresasQuery();

  return useMutation({
    mutationFn: async ({ id }: DeleteEmpresaFields) => {
      const response = await api.DELETE(`/empresas/delete/${id}`);
      
      // Verifica se a resposta é uma string simples ou JSON
      if (typeof response.data === 'string') {
        return { message: response.data }; // Se for uma string, encapsula em um objeto
      }
      return response.data; // Se for JSON, retorna normalmente
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error('Erro ao deletar empresa:', error);
    },
  });
}
