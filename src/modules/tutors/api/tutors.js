import axios from "../../shared/api/axiosInstance";

export const getAll = async () => {
    const { data } = await axios.get("/tutor");
    return data;
};

export const getById = async (id) => {
    const { data } = await axios.get(`/tutor/${id}`);
    return data;
};

export const updateById = async (id, student) => {
    const { data } = await axios.patch(`/tutor/${id}`, student);
    return data;
};

export const create = async (student) => {
    const { data } = await axios.post("/tutor", student);
    return data;
};

export const deleteById = async (id) => {
    const { data } = await axios.delete(`/tutor/${id}`);
    return data;
}