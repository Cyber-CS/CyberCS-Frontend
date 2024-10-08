import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '~/services';

interface Empresa {
  _id: string;
  name: string;
  hash: string; // Mude de hashes para um hash único
}

export function useGetAllEmpresasQuery(options?: UseQueryOptions<Empresa[], Error>) {
  return useQuery<Empresa[], Error>({
    queryKey: ['allEmpresas'],
    queryFn: async () => {
      const { data, error, response } = await api.GET('/empresas/all', {});
      if (data) return data as Empresa[];
      throw { error, code: response.status };
    },
    ...options,
  });
}
