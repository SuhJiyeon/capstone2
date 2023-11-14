export const dateMaker = (date) => {
  const generatedDate = new Date(date);
  const year = generatedDate.getFullYear();
  const month = generatedDate.getMonth() > 12 ? 12 : generatedDate.getMonth() + 1;
  const day = generatedDate.getDate();
  const hour = generatedDate.getHours();
  const minute = generatedDate.getMinutes();
  const second = generatedDate.getSeconds();

  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`



}