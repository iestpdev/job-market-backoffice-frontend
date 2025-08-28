import { useQuery } from '@tanstack/react-query';
import { getByTutorId } from '../api/users';

const useGetByTutorId = (tutorId) => {
    return useQuery({
        queryKey: ['user', tutorId],
        queryFn: () => getByTutorId(tutorId),
        enabled: !!tutorId,
        onError: (error) => {
            console.error('Error al obtener el usuario por TUTOR_ID:', error);
        },
    });
};

export default useGetByTutorId;
