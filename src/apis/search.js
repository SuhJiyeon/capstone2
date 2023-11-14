import { instance } from "./apiClients";
// 모듈화한 axios 인스턴스를 import
export const getSearchData = async (type, itemName, page) => {
  // 검색 데이터 조회
  try {


    if (type === "item") {
      // 검색어가 item 일 경우
      // 그에 맞는 요청 보냄

      //최신 순
      const res = await instance.get(`/api/boards/item/name?itemName=${itemName}&page=${page ? page : 0}`)
      return res;
    } else if (type === "title") {

      // 검색어가 title 일 경우
      // 그에 맞는 요청 보냄
      const res = await instance.get(`/api/boards/title/name?title=${itemName}&page=${page ? page : 0}`)
      return res;
    } else {
      // 검색어가 item, title 이 아닐 경우 ex. 개발자가 실수로 값을 안넣을 경우에 관한 휴먼 에러처리 라고 봐도 무방
      // 그에 맞는 요청 보냄
      const res = await instance.get(`/api/boards/item/name?itemName=${itemName}&page=${page ? page : 0}`)

      return res;
    }

  } catch (error) {
    return error
  }
  // try catch 문을 사용하여 에러처리
  // 이하 동일
}

export const getSearchDataViewCount = async (type, itemName, page) => {
  try {
    if (type === "item") {

      const res = await instance.get(`/api/boards/item/view?itemName=${itemName}&page=${page ? page : 0}`)
      return res;
    } else if (type === "title") {
      const res = await instance.get(`/api/boards/title/view?title=${itemName}&page=${page ? page : 0}`)
      return res;
    }

  } catch (error) {

  }
}




