import axios from "../../shared/api/axiosInstance";

export const getById = async (id) => {
    const { data } = await axios.get(`/company/${id}`);
    return data;
};

export const updateById = async (id, company) => {
    const { data } = await axios.patch(`/company/${id}`, company);
    return data;
};

export const updateByIdWithFormData = async (id, formData) => {
    const { data } = await axios.patch(`/company/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
};

export const create = async (company) => {
    const { data } = await axios.post("/company", company);
    return data;
}

export const createWithFormData = async (formData) => {
    const { data } = await axios.post("/company", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
};

export const deleteById = async (id) => {
    const { data } = await axios.delete(`/company/${id}`);
    return data;
}

export const getAll = async () => {
    const { data } = await axios.get("/company");
    return data;
}

export const activate = async (id) => {
    const { data } = await axios.patch(`/company/activate/${id}`);
    return data;
}

export const deactivate = async (id) => {
    const { data } = await axios.patch(`/company/deactivate/${id}`);
    return data;
}