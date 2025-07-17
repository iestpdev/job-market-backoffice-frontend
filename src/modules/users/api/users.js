import axios from "../../shared/api/axiosInstance";

export const getAll = async () => {
    const { data } = await axios.get("/user");
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