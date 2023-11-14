import React, { useEffect, useRef, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../apis/board";
import {
  getCategory,
  getLeafCategory,
  getSubCategory,
} from "../../apis/category";
import CategoryList from "../../components/CategoryList";
import Map from "../../components/Map";
import useInput from "../../hooks/useInput";
import { readURL } from "../../utils/readUrl";
import styles from "./Upload.module.css";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const Upload = (props) => {
  const navigate = useNavigate();
  const fileUploadRef = useRef(null);
  const [files, setFiles] = useState([]);
  const {
    value: titleValue,
    setValue: setTitleValue,
    onChange: onChangeTitle,
  } = useInput();
  const {
    value: contentValue,
    setValue: setContentValue,
    onChange: onChangeContent,
  } = useInput();
  const {
    value: proudctValue,
    setValue: setProductValue,
    onChange: onChangeProduct,
  } = useInput();
  const {
    value: serialValue,
    setValue: setSerialValue,
    onChange: onChangeSerial,
  } = useInput();
  // 대분류
  const [mainCategory, setMainCategory] = useState("");
  // 중분류
  const [subCategory, setSubCategory] = useState("");
  // 소분류
  const [leafCategory, setLeafCategory] = useState("");
  const [categoryId, setCategoryId] = useState();
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [subSelectedCategory, setSubSelectedCategory] = useState("");
  const [leafSelectedCategory, setLeafSelectedCategory] = useState("");

  const [mainCategoryId, setMainCategoryId] = useState(0);

  const [subCategories, setSubCategories] = useState([]);
  const [leafCategories, setLeafCategories] = useState([]);

  const [errMsg, setErrMsg] = useState(null);
  const [geoLocation, setGeoLocation] = useState(null);
  useEffect(() => {

  }, [geoLocation])

  // submit 버튼 클릭 시 필요한 조건들을 체크하는 함수
  const handleSubmit = async () => {


    if (files.length <= 0) {
      return alert("이미지를 하나 이상 업로드 해주세요");
    }
    if (!categoryId) {
      return alert("카테고리를 선택 해주세요");
    }

    if (!titleValue || titleValue.length < 0) {
      return alert("제목을 입력 해주세요");
    }

    if (!contentValue || contentValue.length < 0) {
      return alert("내용을 입력 해주세요");
    }


    const res = await createPost({
      mainCategory: mainCategory,
      subCategory: subCategory,
      leafCategory: leafCategory,
      category: categoryId,
      title: titleValue,
      content: contentValue,
      itemName: proudctValue,
      serialNumber: serialValue,
      image: fileUploadRef.current.files,
      longitude: geoLocation.lng,
      latitude: geoLocation.lat,
    });

    if (res.status === 201) {

      if (!serialValue || serialValue?.length <= 0) {
        alert(`업로드 성공! \n 시리얼번호: ${res.data.result.data.serialNumber}`);
        return navigate("/success")

      } else {
        alert("업로드 성공!");
        return navigate("/success")
      }

      // return window.location.replace("/success");
    } else {
      window.localStorage.replace("/");
      return alert("오류가 발생 했습니다");
    }
  };

  const handleFileUpload = async (e) => {
    const fileList = e.target.files;

    if (files.length >= 12) {
      return alert("이미지는 최대 12개 까지 업로드가 가능합니다");
    } else if (files.length + fileList.length > 12) {
      return alert("이미지는 최대 12개 까지 업로드가 가능합니다");
    }

    const map = [...files, ...fileList].map((item) => {
      item.src = readURL(item);
      return item;
    });
    setFiles(map);
  };

  useEffect(() => {
    if (files.length <= 0) {
      fileUploadRef.current.value = "";
    }
  }, [files]);
  const handleImageRemoveButtonClick = (idx) => {
    const filter = files.filter((_, i) => i !== idx);
    setFiles(filter);
  };

  const handleSelectOnChange = (e) => {

    setCategoryId(e.id);
  };

  useEffect(() => {
    const fetching = async () => {
      const res = await getCategory();
      const map = res.data.result.data.map((item) => {
        return { value: item.category, label: item.category, id: item.id };
      });
      setCategories(map);
    };
    fetching();
  }, []);

  const subAxiosCategory = async (id) => {
    const res = await getSubCategory(id);

    try {
      const map = res?.data.result.data?.map((item) => {
        return { value: item.category, label: item.category, id: item.id };
      });

      setSubCategories(map);
    } catch {
      setErrMsg(res?.response?.data.result.message);
      setSubCategories([]);
      return;
    }
  };

  const leftAxiosCategory = async (mainCategoryId, subCategoryId) => {
    const res = await getLeafCategory(mainCategoryId, subCategoryId);

    try {
      const map = res?.data.result.data?.map((item) => {
        return { value: item.category, label: item.category, id: item.id };
      });

      setLeafCategories(map);
    } catch {
      setLeafCategories([]);
      return;
    }
  };

  /* main categories Click*/
  const categoriesClick = (id, value) => {

    // 대분류 세팅
    setMainCategory(id);
    // 중분류 & 소분류 초기화
    setSubCategory("");
    setLeafCategory("");

    setCategoryId(id);
    setSelectedCategory(value);

    setSubSelectedCategory("");
    setLeafCategories([]);

    //main id save
    setMainCategoryId(id);

    //api호출
    subAxiosCategory(id);
  };

  const subCategoriesClick = async (id, value) => {

    // 중분류 세팅
    setSubCategory(id);
    // 소분류 초기화
    setLeafCategory("");

    setCategoryId(id);

    setSubSelectedCategory(value);
    setLeafSelectedCategory("");

    //api 호출
    await leftAxiosCategory(mainCategoryId, id);
  };

  const leafCategoriesClick = (id, value) => {

    // 소분류 세팅
    setLeafCategory(id);

    setCategoryId(id);
    setLeafSelectedCategory(value);
  };


  return (
    <div className={styles.Layout}>
      <div className={styles.Section}>
        <div className={styles.SectionTitle}>
          기본 정보
          <div
            className={styles.UploadTitle}
            style={{
              fontSize: "1.8rem",
              marginTop: "10px",
              marginLeft: "10px",
            }}
          >
            필수 항목
          </div>
        </div>

        <div
          className={styles.UploadTitle}
          style={{ marginTop: "20px", marginBottom: "10px" }}
        >
          상품 이미지
          <div
            style={{ color: "gray", fontSize: "1.8rem", marginLeft: "10px" }}
          >
            ({files.length} / 12)
          </div>
        </div>
        <div className={styles.ImageBox}>
          <ul className={styles.ImageList}>
            <input
              ref={fileUploadRef}
              type="file"
              style={{ display: "none" }}
              id="file"
              onChange={handleFileUpload}
              multiple
            />

            <label className={styles.ImageItemBlank} htmlFor="file">
              <div className={styles.ImageContent}>
                <AiFillCamera
                  size={30}
                  color="rgb(128,128,128,0.4)"
                  style={{ marginBottom: "6px" }}
                />
                이미지 등록
              </div>
            </label>

            {files.map((item, idx) => {
              return (
                <li key={item.src + idx} className={styles.ImageItem}>
                  <div
                    className={styles.ImageRemoveButton}
                    onClick={() => handleImageRemoveButtonClick(idx)}
                  >
                    <GrFormClose size={20} />
                  </div>
                  <div
                    className={styles.ImageContent}
                    style={{
                      backgroundImage: `url('${item.src}')`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "Center",
                    }}
                  ></div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.InfoBox}>
          <div style={{ color: "black", fontWeight: "bold" }}>주의사항</div>{" "}
          <br />
          - 이미지 사이즈는 000px * 000px 이하로 리사이즈 해주세요
          <br />
          - 이미지 용량이 10MB를 넘어가면 업로드 할 수 없습니다.
          <br />- 업로드한 이미지는 관리자 판단 후 블러처리 혹은 삭제 처리 할 수
          있습니다.
        </div>
      </div>

      <div className={styles.BottomLine}></div>

      <div className={styles.Section}>
        <div className={styles.PostTitleBox}>
          <div className={styles.UploadTitle}>카테고리</div>
          <div className={styles.Select}>
            <CategoryList
              categories={categories}
              onClick={categoriesClick}
              selectedCategory={selectedCategory}
            />
            <CategoryList
              categories={subCategories}
              onClick={subCategoriesClick}
              selectedCategory={subSelectedCategory}
              noData={
                categories &&
                subCategories.length === 0 && (
                  <div className={styles.SelectCategoryInfo}>
                    {errMsg ? errMsg : "중분류 선택"}
                  </div>
                )
              }
            />

            <CategoryList
              categories={leafCategories ? leafCategories : []}
              onClick={leafCategoriesClick}
              selectedCategory={leafSelectedCategory}
              noData={
                leafCategories === undefined && !leafCategories ? (
                  <div className={styles.SelectCategoryInfo}>
                    {"카테고리가 비어있습니다."}
                  </div>
                ) : (
                  <div className={styles.SelectCategoryInfo}>
                    {"소분류 선택"}
                  </div>
                )
              }
            />
          </div>
        </div>

        <div className={styles.SelectCategoryText}>
          {`선택한 카테고리 : ${selectedCategory} ${subSelectedCategory && ">"
            } ${subSelectedCategory}`}{" "}
          {leafSelectedCategory && ">"} {leafSelectedCategory}
        </div>
      </div>

      <div className={styles.BottomLine}></div>

      <div className={styles.Section}>
        <div className={styles.PostTitleBox}>
          <div className={styles.UploadTitle}>제목</div>
          <input
            className={styles.UploadInput}
            placeholder="제목을 입력 해주세요"
            onChange={onChangeTitle}
            value={titleValue}
          />
        </div>
      </div>
      <div className={styles.BottomLine}></div>

      <div className={styles.Section}>
        <div className={styles.PostTitleBox}>
          <div className={styles.UploadTitle}>내용</div>
          <textarea
            className={styles.UploadTextarea}
            placeholder="내용을 입력 해주세요"
            onChange={onChangeContent}
            value={contentValue}
          />
        </div>
      </div>
      <div className={styles.BottomLine}></div>

      <div className={styles.Section}>
        <div className={styles.PostTitleBox}>
          <div className={styles.UploadTitle}>상품명</div>
          <input
            className={styles.UploadInput}
            placeholder="상품명을 입력 해주세요"
            onChange={onChangeProduct}
            value={proudctValue}
          />
        </div>
      </div>

      <div className={styles.BottomLine}></div>

      <div className={styles.Section}>
        <div className={styles.PostTitleBox}>
          <div className={styles.UploadTitle}>시리얼 넘버</div>
          <input
            className={styles.UploadInput}
            placeholder="시리얼넘버가 있다면 입력 해주세요"
            onChange={onChangeSerial}
            value={serialValue}
          />
        </div>
      </div>
      <div className={styles.BottomLine}></div>
      <div className={styles.Section}>
        <div className={styles.PostTitleBox} style={{ justifyContent: "flex-start" }}>
          <div className={styles.UploadTitle}>분실 위치</div>
          <div style={{ fontSize: "1.5rem", lineHeight: "2" }}>대략적인 분실 위치를 지도에 마커로 표시해주세요</div>
        </div>


        <Map setGeoLocation={setGeoLocation}></Map>
      </div>
      <div className={styles.BottomLine}></div>





      <div className={styles.Section}>
        <div className={styles.SubmitButtonBox}>
          <div className={styles.SubmitButton} onClick={handleSubmit}>
            등록하기
          </div>
        </div>
      </div>
     
    </div>
  );
};

Upload.propTypes = {};

export default Upload;
