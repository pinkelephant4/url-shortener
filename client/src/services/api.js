import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 5000,
});

const callApi = async (api) => {
    try {
        const res = await api;

        if (res.status === 204) {
            return;
        }

        if (!res.data.success) {
            throw new Error(res.data.message);
        }
        return res.data.data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};

export const createShortUrl = async (url) => {
    return await callApi(API.post("/shorten", { url }));
};
export const getOriginalUrl = async (shortCode) => {
    return await callApi(API.get(`/shorten/${shortCode}`));
};
export const updateUrl = async (shortCode, url) => {
    return await callApi(API.put(`/shorten/${shortCode}`, { url }));
};
export const deleteUrl = async (shortCode) => {
    return await callApi(API.delete(`/shorten/${shortCode}`));
};
export const getStats = async (shortCode) => {
    return await callApi(API.get(`/shorten/${shortCode}/stats`));
};
