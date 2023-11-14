import { instance } from "./apiClients";

// 모듈화한 axios 인스턴스를 import
export const getCategory = async () => {
  try {
    const res = await instance.get('/api/categories')

    return res;
  } catch (error) {
    return error
  }

  // try catch 문을 사용하여 에러처리
  // 이하 동일
}

export const getSubCategory = async (id) => {
  try {
    const res = await instance.get(`/api/categories/${id}`)
    return res;
  } catch (error) {
    return error
  }
}

export const getLeafCategory = async (sub, leaf) => {
  try {
    const res = await instance.get(`/api/categories/${sub}/${leaf}`)
    return res;
  } catch (error) {

  }

}