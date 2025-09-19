import axios from "../../shared/api/axiosInstance";

export const getAll = async () => {
    const { data } = await axios.get("/user");
    return data;
};

export const getAllUsersAdmin = async () => {
    const { data } = await axios.get("/user/usersAdmin");
    return data;
};


export const create = async (student) => {
    const { data } = await axios.post("/user", student);
    return data;
};

export const updateById = async (id, user) => {
    const { data } = await axios.patch(`/user/${id}`, user);
    return data;
}

export const deleteById = async (id) => {
    const { data } = await axios.delete(`/user/${id}`);
    return data;
}

export const updateCredentialsByTutorId = async (tutorId, user) => {
    const { data } = await axios.patch(`/user/update-credentials-by-tutor/${tutorId}`, user);
    return data;
}

export const updateCredentialsByStudentId = async (studentId, user) => {
    const { data } = await axios.patch(`/user/update-credentials-by-student/${studentId}`, user);
    return data;
}

export const updateCredentialsByCompanyId = async (companyId, user) => {
    const { data } = await axios.patch(`/user/update-credentials-by-company/${companyId}`, user);
    return data;
}

export const getByTutorId = async (tutorId, user) => {
    const { data } = await axios.get(`/user/by-tutor/${tutorId}`, user);
    return data;
}

export const getByStudentId = async (studentId, user) => {
    const { data } = await axios.get(`/user/by-student/${studentId}`, user);
    return data;
}

export const getByCompanyId = async (companyId, user) => {
    const { data } = await axios.get(`/user/by-company/${companyId}`, user);
    return data;
}