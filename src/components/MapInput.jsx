import { useEffect, useRef } from "react";

const MapInput = ({ setSearchLocation }) => {
  const autoCompleteRef = useRef();

  // 검색창 DOM을 직접 조작 하기 위하여 useRef 사용
  const inputRef = useRef();

  // 검색창에 대한 옵션 설정
  // country : 검색할 국가를 한정
  // fields : 검색 결과로 받고 싶은 정보
  // types : 검색할 장소의 타입
  const options = {
    componentRestrictions: { country: "kr" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["establishment"]
  };


  useEffect(() => {

    // 검색창에 대한 옵션을 적용하여 autoCompleteRef.current에 저장
    // autoCompleteRef.current에는 검색창에 대한 정보가 담겨있음
    // 눈에 보이지 않는 DOM이라고 생각하면 됨

    autoCompleteRef.current = new window.google.maps.places.Autocomplete(

      // 검색창 DOM 아래 input 엘리먼트를 autoCompleteRef.current에 적용
      inputRef.current,

      // 검색창에 대한 옵션을 적용
      options
    );


    // autoCompleteRef.current에 이벤트 리스너를 추가 
    // ( 위에서 선언하고 new window.google.maps.places.Autocomplete()로 초기화한 autoCompleteRef.current에 이벤트 리스너를 추가  )

    // place_changed : 검색창에 검색어를 입력하고 엔터를 누르거나 검색 결과를 클릭했을 때 발생하는 이벤트
    // place_changed 이벤트가 발생하면 setSearchLocation을 호출하여 검색 결과를 전달
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();

      setSearchLocation({ place })

    });
  }, []);
  return (
    <div>
      <label>enter address :</label>

      {/* 검색바를제어하기위해 useRef 사용하고 있음 */}
      <input
        onChange={event => console.log(event.target.value)}
        ref={inputRef}
        type="text"
        placeholder="대략적인 분실 위치를 입력해주세요"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `100%`,
          height: `42px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          marginBottom: "10px",
          textOverflow: `ellipses`,
        }} />
    </div>
  );
};
export default MapInput