import axios, { AxiosResponse } from 'axios';

// Extend the AxiosInstance interface
declare module 'axios' {
  interface AxiosInstance {
    getWithAuth<T = any>(url: string, token: string): Promise<AxiosResponse<T>>;
  }
}

async function fetchUserData(userId: string, token: string) {
  const response = await axios.getWithAuth<{ name: string, email: string }>(
      `/users/${userId}`,
      token
  );
  console.log(response.data.name);
}