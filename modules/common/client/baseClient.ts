import axios from "axios";

export const client = axios.create({
    baseURL: "http://localhost:3011/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

client.interceptors.request.use(async (config) => {
    // Get session 

    // Set some headers
    //config.headers.Authorization = `Bearer ${session?.user.accessToken}`

    return config;
});