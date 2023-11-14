## 파일 구조

src <br />

- **apis** <br />
  - api 요청 모듈화
- **assets** </br>
  - 이미지, 영상 등 정적 이미지 저장용
- **components** <br />

  - 사용할 컴포넌트들이 모여있는 폴더

- **hooks** <br />
  - 반본로직 및 반복 컴포넌트를 커스텀 훅으로 만들어 사용하기 위한 폴더
- **utils** <br />
  - 유틸성 로직 저장용 ex. 단순계산 및 Date 포멧 처리
- **styles** <br />
  - 공용 스타일, 반응형 작업을 위한 디바이스 사이즈 정의 및 메인 컬러 메인 사이즈 등등

<br />

<br />

## 스타일

css 모듈을 사용하여 중복 네이밍 제어
css 모듈을 사용하면 자동으로 클래스네임에 유니크 값을 넣어서 생성해준다

<br />
<br />

<br />

## 문제 및 개선

<details>
<summary>이미지 불러오기</summary>

<br />

## 문제상황_메인페이지에서 이미지 불러오기 오류

이미지 업로드시 ec2

에서 저장 후 프론트쪽에 응답 값으로 이미지를 전달할 때 가공 후 규칙대로 지정한 이미지의 이름을 전달해줬는데 이를 프론트에서 접근 할 수 없는 문제가 발생

ex. images 배열 속에 이미지 이름들만 응답으로 옴
api 에서 get http://주소/api/image/{이미지 이름}
형태로 이미지에 접근 하도록 하고 싶었는데 여기서 문제 발생

저런식으로 작성하면 모든 이미지에 대해 get 요청을 보내는 형태라 백엔드에서 해당 로직을 따로 또 작성 해줘야함

정적 저장소에 저장시 get요청을 안보내는건가?
-> 마찬가지로 get 요청을 보내지만 aws단에서 백엔드 메인 서버와 분리된 상태라서 고려할 사항이 많지 않음



<br />

## 개선

이미지를 정적 저장소에 따로 저장하는 로직 작성(백엔드)


프론트에서는 이미지가 저장된 정적 저장소의 주소를 받아 이미지 태그에서 바로 사용할 수 있도록 수정

</details>

<br />
<br />
<br />

## 기타

### 카카오맵

카카오맵으로 분실물의 위치를 마커로 찍으려고함
필요한 데이터는 분실물의 위치가 기록된 위도, 경도 데이터

위도, 경도 데이터는 유저가 게시글 업로드 할 때 마커에 찍어서 보내는 방식
<br />
<br />
<br />

프론트가 할 일

<br />
마커를 찍고 그 값을 백엔드로 잘 보낸다.

마커에 찍었는데 그 값을 어떻게 백엔드로 보내는가?
카카오맵은 특정 작업에 대한 제어 함수를 따로 정의 해두었음 대표적으로 마커들의 위치를 다 가져오는 함수가 있음

```js
const maker = 마커객체;
...
const target = marker.getPosition();
// 해당 함수로 마커위치를 들고올 수 있음
// target 변수에 마커 정보가 찍혀있음 위도,경도와 함께

```

위와 같은 방식으로 마커 정보를 얻어와서 업로드 api 에서 바디에 넣어보내면됨

<br />
<br />
<br />

그렇다면 백엔드가 할일은?

게시물을 저장 할 때 위도 경도와 함께 저장해야함

ex. DB 컬럼이 id, postName, ... 이런식으로 있을 때 위도 컬럼과 경도 컬럼을 하나 더 만들어줘야함 게시글 생성 요청 받으면 위도 경도도 db에 기록해주면됨

게시물 조회 요청이 오면 위도, 경도도 포함해서 바디에 넣어서 응답을 주면됨

게시물 관련한 모든 응답 객체는

```js
{
id:number;
...
위도:number;
경도:number;
}

형태로 위도 경도를 포함해서 보내줘야함
(모두가 아니더라도 필요한 부분에서는)
```

<br />

# Main Page

메인 페이지 최초 접속 시 ( 새로고침 포함 ) 서버로 카테고리 목록 요청과 최근 게시글 요청을 보냅니다

```js
const data = await getCategory();
const post = await getRecentPost();
```

요청이 정상적으로 오면 해당 값들로 상태를 업데이트 합니다.

그럼 웹 페이지에 최근 게시물, nav바 카테고리 리스트 등이 표시됩니다.

메인 페이지에서 최근 게시물 항목에 있는 게시물을 누르면
게시물 상세 페이지로 이동합니다 ( 예정 )

<br />

# Header

헤더에는 로그인 / 회원가입, 검색 기능이 있습니다. 왼쪽 로고를 클릭 하면 메인 페이지로 이동하고 로그인/회원가입 버튼을 누르면 로그인/회원 가입 페이지로 이동 합니다.

검색바: 검색바에는 서버쪽으로 요청을 보내는 로직이 작성되어 있습니다
검색어를 입력 후 엔터를 누르면 서버에 검색 요청을 보냅니다

```js
 if(e.keyCode === 13)
 //  방금 누른 키가 엔터인지 다른 키 인지 확인 후

// 아래 두가지 요청을 보냅니다.
   const result = await getSearchData("item", value)
   const titleResult = await getSearchData("title", value)
```

요청을 두가지 형태로 보내고 있는데 분실물 이름으로 검색, 게시글 제목으로 검색 두가지 검색을 하기위함 입니다.

<br />

# Upload

업로드 페이지에서는 유저가 선택한 이미지, 그리고 텍스트 정보들을 서버로 전송합니다.

프론트에서 데이터 필터링을 모두 거친 후 아래 요청을 보냅니다

```js
const res = await createPost({
  categoryId: categoryId,
  title: titleValue,
  content: contentValue,
  itemName: proudctValue,
  serialNumber: serialValue,
  image: fileUploadRef.current.files,
});
```

각 항목은 백엔드에서 요구하는 항목들입니다. (api 명세서 참고)
<span style="background-color:#fff5b1; color:black;  "> creatPost </span>
함수로 전달한 파라미터 들은 아래
<span style="background-color:#fff5b1; color:black;  "> formData</span>
로 가공하는 과정을 거칩니다.

```js
const formData = new FormData();
formData.append("image", image);
formData.append("title", title);
formData.append("content", content);
formData.append("itemName", itemName);
formData.append("serialNumber", serialNumber);
```

<br />

# Products

프로덕트 페이지 에서는 상품들을 리스트로 보여줍니다.
페이지에 최초 입장 시 검색으로 접근한 페이지 인지 새로고침 후 해당 페이지에서 다시 마운트 한것인지 체크합니다.

새로고침 한것이라면 새로운데이터를 서버에 다시 요청합니다.

```js
const result = await getSearchData("item", localStorage.getItem("q"));
const titleResult = await getSearchData("title", localStorage.getItem("q"));
```

로컬 스토리지 에는 header에서 저장한 검색어가 저장되어있습니다. 해당 값을 기반으로 다시 검색 요청을 보냅니다.

<br />

하지만 검색을 통해 해당 페이지에 들어왔다면 위 검색 로직을 또 수행할 필요가 없습니다.

```js
const isSearch = localStorage.getItem("search");

// 이미 검색 했으니 얼리리턴
if (JSON.parse(isSearch)) {
  return;
}
```

Header 속 검색 컴포넌트에서 엔터 입력 시 로컬스토리지에 저장하는 식별값 입니다. 해당 값을 확인하고 검색으로 온건지 새로고침으로 온건지 체크 후 요청을 최소화 합니다.

이렇게되면 검색 요청후 새로고침을 했을 때 다시 요청을 하지 않으니 과거 데이터에 머물러 있을 가능성이 있는거 아니냐 할 수 있는데 그 문제 때문에 마운트 시 새로운 요청을 보내도록 처리
