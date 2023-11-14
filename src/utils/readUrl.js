export const readURL = (input, idx) => {
  if (input) {
    const imageSrc = URL.createObjectURL(input);
    return imageSrc
  }
}

// 객체를 url로 만들어서 반환
// 이미지 업로드 페이지에서 업로드할 이미지 선택 시 미리보기를 위한 함수
// img 태그에서 사용하려면 이미지 url을 src에 넣어줘야 함 그 src에들어갈 url을  만드는 작업