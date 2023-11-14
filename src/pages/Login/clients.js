import axios from 'axios';

const axiosinstance = axios.create({
  baseURL: "https://www.assac.shop/api", // 백엔드 API의 기본 URL로 설정합니다.
  timeout: 1000,
});

export default axiosinstance;