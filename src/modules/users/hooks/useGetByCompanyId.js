import { useQuery } from '@tanstack/react-query';
import { getByCompanyId } from '../api/users';

const useGetByCompanyId = (companyId) => {
    return useQuery({
        queryKey: ['user', companyId],
        queryFn: () => getByCompanyId(companyId),
        enabled: !!companyId,
        onError: (error) => {
            console.error('Error al obtener el usuario por EMPRESA_ID:', error);
        },
    });
};

export default useGetByCompanyId;
