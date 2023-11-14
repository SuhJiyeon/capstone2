import { useState } from "react";


// input value 제어 커스텀 훅
const useInput = props => {

  const [value, setValue] = useState("")

  const onChange = (e) => {
    setValue(e.target.value)
    // input value 변경시 할 작업 입력
  }

  return { value, setValue, onChange }
};

useInput.propTypes = {

};

export default useInput;