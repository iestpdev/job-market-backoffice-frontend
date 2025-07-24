import axios from "../../shared/api/axiosInstance";

export const getAmountCandidatesByOfferId = async (offerId) => {
    const { data } = await axios.get(`/candidacy/get-amount-candidates-by-offer-id/${offerId}`);
    return data;
};

export const getAllByOfferId = async (offerId) => {
    const { data } = await axios.get(`/candidacy/get-all-by-offer-id/${offerId}`);
    return data;
};