import { instance } from "./apiClients";
// 모듈화한 axios 인스턴스를 import
export const createPost = ({ mainCategory, subCategory, leafCategory, category, title, content, itemName, serialNumber, image, latitude, longitude }) => {
  // 게시글 생성



  const formData = new FormData()

  Array.from(image).forEach((img) => {
    console.log(img, "img")
    formData.append('files', img)
  })

  // formData.append('files', Array.from(image))
  formData.append('title', title)
  formData.append('category', category)
  formData.append('content', content)
  formData.append('itemName', itemName)
  formData.append('serialNumber', serialNumber)

  // 위도, 경도 데이터를 문자열로 변환하여 보냄.
  formData.append('latitude', latitude.toString())
  formData.append('longitude', longitude.toString())
  // 폼데이터로 데이터를 담아서 보냄 



  try {
    // 대분류(mainCategory) / 중분류(subCategory) / 소분류(leafCategory) 카테고리를 쿼리파라미터 넘김
    const res = instance.post(`/api/boards?mainCategory=${mainCategory}&subCategory=${subCategory}&leafCategory=${leafCategory}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',

        //헤더에 토큰을 넣어줘야함
        'Authorization': `Bearer ${localStorage.getItem('login-token')}`
      }
    })
    return res;
  } catch (error) {
    return error;
  }
  // try catch 문을 사용하여 에러처리
  // try catch 문을 사용하지 않으면 에러가 발생하면서 프로그램이 멈춤
  // try catch 문을 사용하면 에러가 발생하더라도 프로그램이 멈추지 않고 에러를 처리할 수 있음

}


export const getRecentPost = () => {
  // 최근 게시글 조회
  try {
    const res = instance.get(`/api/boards/all`)
    return res;
  } catch (error) {
    return error;
  }
  // try catch 문을 사용하여 에러처리
  // 이하 동일
}


export const getProductsItem = (item) => {
  try {
    const res = instance.get(`/api/board/${item.id}`)
    return res;
  } catch (error) {
    return error
  }
}

export const getCategoryProducts = (item) => {
  try {
    const res = instance.get(`/api/boards/all/${item.id}`)
    return res;
  } catch (error) {
    return error
  }
}


export const getProductGeo = () => {
  try {
    const res = instance.get(`/api/gps`)
    return res;
  } catch (error) {
    console.log(error)
    return error;
  }
}