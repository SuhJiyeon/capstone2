import axiosInstance from './clients';

export const refreshAccessToken = (refreshToken) => {
  return axiosInstance.post('/user/refresh_token', { refreshToken })
    .then((response) => {
      const newAccessToken = response.data.accessToken;
      return newAccessToken;
    })
    .catch((error) => {
      console.log('토큰 재발급 실패:', error);
      throw error;
    });
};
