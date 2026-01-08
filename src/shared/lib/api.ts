import axios from "axios";

const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export const api = axios.create({
  baseURL: `${baseUrl}/api`,
  withCredentials: true,
});
