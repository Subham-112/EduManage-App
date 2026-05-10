import axios, { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MODE, DEV_BASE_URL, PROD_BASE_URL } from '@env';

export const BASE_URL = MODE === 'dev' ? DEV_BASE_URL : PROD_BASE_URL;
console.log('🔗 API Base URL:', BASE_URL, '🌏 Mode:', MODE);

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async config => {
    try {
      const token = await TokenStorage.getToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error in request interceptor:', error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const TokenStorage = {
  async setToken(token: string) {
    try {
      console.log('Setting auth token:', token);
      await AsyncStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Error setting token:', error);
    }
  },

  async getToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem('authToken');
      return token;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  async removeToken() {
    try {
      await AsyncStorage.removeItem('authToken');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  },

  async setSplashView(value: boolean) {
    try {
      await AsyncStorage.setItem('splashView', value.toString());
    } catch (error) {
      console.error('Error setting splash view:', error);
    }
  },

  async getSplashView(): Promise<boolean | null> {
    try {
      const value = await AsyncStorage.getItem('splashView');
      return value ? value === 'true' : null;
    } catch (error) {
      console.error('Error getting splash view:', error);
      return null;
    }
  },

  async removeSplashView() {
    try {
      await AsyncStorage.removeItem('splashView');
    } catch (error) {
      console.error('Error removing splash view:', error);
    }
  },
};

const request = async <T>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  try {
    if (config.data instanceof FormData) {
      config.headers = {
        ...config.headers,
        "Content-Type": "multipart/form-data",
      };
    };

    console.log(`📤---> ${config.method?.toUpperCase()} ${config.url}`);
    console.log("🌐 Final URL:", api.getUri({
      ...config,
      url: config.url,
      params: config.params,
    }));

    // Log request body for POST/PUT/PATCH requests
    if (config.data && ['post', 'put', 'patch'].includes(config.method?.toLowerCase() || '')) {
      console.log("📦 Request Body:", JSON.stringify(config.data, null, 2));
    }

    const finalUrl = config.url?.startsWith('http') ? config.url : `${BASE_URL}${config.url?.startsWith('/') ? config.url.substring(1) : config.url}`;

    const response = await api.request<T>({
      ...config,
      url: finalUrl
    });
    return response;
  } catch (error: any) {
    console.error('❌ API request error:', {
      url: config.url,
      method: config.method,
      statusCode: error.response?.status,
      data: config.data,
      error: error instanceof Error ? error.message : error,
    });

    const fullError = {
      success: false,
      url: config.url,
      statusCode: error.response?.status || 500,
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      data: error.response?.data || null,
    };

    throw fullError;
  };
};

export const Fetch = async <T>(
  url: string,
  data?: Record<string, unknown> | FormData,
  timeout?: number,
): Promise<T> => {
  try {
    const response = await request<T>({
      method: 'GET',
      url,
      data,
      timeout,
    })

    return response.data;
  } catch (error: any) {
    console.error('❌ Fetch error:', error);
    throw error;
  }
};

export const Post = async <T>(
  url: string,
  data?: Record<string, unknown> | FormData,
  timeout?: number,
): Promise<T> => {
  try {
    const response = await request<T>({
      method: 'POST',
      url,
      data,
      timeout,
    });
    return response.data;
  } catch (error: any) {
    console.error('❌ Post error:', error);
    throw error;
  }
};

export const Put = async <T>(
  url: string,
  data?: Record<string, unknown> | FormData,
  timeout?: number,
): Promise<T> => {
  try {
    const response = await request<T>({
      method: 'PUT',
      url,
      data,
      timeout,
    });
    return response.data;
  } catch (error: any) {
    console.error('❌ Put error:', error);
    throw error;
  };
};

export const Patch = async <T>(
  url: string,
  data?: Record<string, unknown> | FormData,
  timeout?: number,
): Promise<T> => {
  try {
    const response = await request<T>({
      method: 'PATCH',
      url,
      data,
      timeout,
    });
    return response.data;
  } catch (error: any) {
    console.error('❌ Patch error:', error);
    throw error;
  };
};

export const Delete = async <T>(
  url: string,
  data?: Record<string, unknown> | FormData,
  timeout?: number,
): Promise<T> => {
  try {
    const response = await request<T>({
      method: 'DELETE',
      url,
      data,
      timeout,
    });
    return response.data;
  } catch (error: any) {
    console.error('❌ Delete error:', error);
    throw error;
  };
};
