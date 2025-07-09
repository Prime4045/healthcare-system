import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await api.post('/auth/refresh-token', {
            refreshToken
          });

          const { token, refreshToken: newRefreshToken } = response.data.data;
          localStorage.setItem('authToken', token);
          localStorage.setItem('refreshToken', newRefreshToken);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  socialLogin: (socialData) => api.post('/auth/social-login', socialData),
  logout: () => api.post('/auth/logout'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.patch(`/auth/reset-password/${token}`, { password }),
  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`),
  refreshToken: (refreshToken) => api.post('/auth/refresh-token', { refreshToken }),
};

// User API calls
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  uploadAvatar: (formData) => api.post('/users/upload-avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  changePassword: (passwordData) => api.patch('/users/change-password', passwordData),
  deleteAccount: () => api.delete('/users/account'),
};

// Doctor API calls
export const doctorAPI = {
  getAllDoctors: (params) => api.get('/doctors', { params }),
  getDoctorById: (id) => api.get(`/doctors/${id}`),
  searchDoctors: (query) => api.get(`/doctors/search?q=${query}`),
  getDoctorsBySpecialty: (specialty) => api.get(`/doctors/specialty/${specialty}`),
  getDoctorAvailability: (doctorId, date) => api.get(`/doctors/${doctorId}/availability?date=${date}`),
};

// Appointment API calls
export const appointmentAPI = {
  bookAppointment: (appointmentData) => api.post('/appointments', appointmentData),
  getAppointments: (params) => api.get('/appointments', { params }),
  getAppointmentById: (id) => api.get(`/appointments/${id}`),
  updateAppointment: (id, updateData) => api.put(`/appointments/${id}`, updateData),
  cancelAppointment: (id, reason) => api.patch(`/appointments/${id}/cancel`, { reason }),
  rescheduleAppointment: (id, newDateTime) => api.patch(`/appointments/${id}/reschedule`, newDateTime),
  rateAppointment: (id, rating) => api.post(`/appointments/${id}/rate`, rating),
};

// Notification API calls
export const notificationAPI = {
  getNotifications: (params) => api.get('/notifications', { params }),
  markAsRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllAsRead: () => api.patch('/notifications/read-all'),
  deleteNotification: (id) => api.delete(`/notifications/${id}`),
};

export default api;