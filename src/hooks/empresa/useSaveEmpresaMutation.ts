import { useMutation } from '@tanstack/react-query';
import { api } from '~/services';

interface SaveEmpresaFields {
  name: string;
  hash: string; 
}

export function useSaveEmpresaMutation() {
  return useMutation({
    mutationFn: async ({ name, hash }: SaveEmpresaFields) => {
      const { data, error, response } = await api.POST('/empresas/register', {
        body: { name, hash }, 
      });
      if (data) return data;
      throw { error, code: response.status };
    },
    onError: (error) => {
      console.error('Erro ao salvar empresa:', error);
    },
    onSuccess: (data) => {
      console.log('Empresa salva com sucesso:', data);
    },
  });
}
