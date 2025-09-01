import { useQuery } from '@tanstack/react-query';
import { getByStudentId } from '../api/users';

const useGetByStudentId = (studentId) => {
    return useQuery({
        queryKey: ['user', studentId],
        queryFn: () => getByStudentId(studentId),
        enabled: !!studentId,
        onError: (error) => {
            console.error('Error al obtener el usuario por ALUMNO_ID:', error);
        },
    });
};

export default useGetByStudentId;
