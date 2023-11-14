import React, { useEffect, useState } from "react";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineWarning,
} from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { BsPlusSquare, BsThreeDots } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { getCategoryProducts } from "../../apis/board";
import { getCategory } from "../../apis/category";
import { getSearchData } from "../../apis/search";
import Logo from "../../assets/logo.png";
import useInput from "../../hooks/useInput";
import rootStyles from "../../styles/common.module.css";
import styles from "./Header.module.css";
const Header = (props) => {
  const [categories, setCategories] = useState([]);
  // 헤더에 노출할 카테고리들이 들어있는 배열
  const { value, setValue, onChange } = useInput();
  // 헤더에 있는 검색 바의 입력 값을 제어하는 커스텀 훅
  const [isVisible, setIsVisible] = useState();
  const navigate = useNavigate();

  // 커스텀 훅에서 반환한 value, setValue, onChange를 사용하여 검색 바의 입력 값을 제어한다.
  // 삭제 버튼 클릭 시 검색 바의 입력 값을 초기화 시키기 위한 함수
  const handleTextRemoveClick = () => {
    setValue("");
  };

  const handleCategoryIconClick = () => { };

  // 카테고리 아이콘 클릭 시 카테고리 페이지로 이동하는 함수
  const handleCategoryClick = async (item) => {

    const result = await getCategoryProducts(item);
    const boards = result.data.result.data.boards
    const pageInfoDto = result.data.result.pageInfoDto

    navigate('/products', { state: { searchResult: boards, pageInfoDto: pageInfoDto } })

  };

  // 검색 버튼 포커스 상태 변경 시 로컬 스토리지에 저장하는 함수
  // 엔터 버튼 눌렀을 때 검색 기능 실행을 위한 함수
  const focusAndBlur = (type) => {
    if (type === "focus") {
      localStorage.setItem("focus", true);
    } else if (type === "blur") {
      localStorage.setItem("focus", false);
    }
  };

  // 엔터 버튼 눌렀을 때 검색 기능 실행을 위한 함수
  const keydownCallback = async (e) => {
    if (JSON.parse(localStorage.getItem("focus")) && e.keyCode === 13) {
      const searchResult = [];
      const result = await getSearchData("item", value);


      if (result?.status === 200) {

        searchResult.push(...result?.data?.result?.data?.boards);
      } else if (result.status === 404) {
      } else {
      }
      const titleResult = await getSearchData("title", value);
      if (titleResult?.status === 200) {
        searchResult.push(...titleResult?.data?.result?.data?.boards);
      } else if (result.status === 404) {
      } else {
      }


      const pageInfoDto = result?.data?.result?.data?.pageInfoDto
      const itemTotalPages = result?.data?.result?.data?.pageInfoDto?.totalPages

      const searchPageInfoDto = titleResult?.data?.result?.data?.pageInfoDto?.totalPages

      const maxTotalPage = Math.max(itemTotalPages, searchPageInfoDto)
      localStorage.setItem("q", value);

      const map = new Map(); // 맵
      for (const item of searchResult) {
        map.set(JSON.stringify(item), item); // name, company가 모두 같은 객체 요소는 제외한 맵 생성
      }
      const filter = [...map.values()];

      localStorage.setItem("search", true);
      navigate("/products", {
        state: { searchResult: filter, query: { type: "item", value: value }, pageInfoDto: { ...pageInfoDto, totalPages: maxTotalPage } },
      });
    }
  };

  //
  // useEffect(() => {
  //   // product 페이지를 검색으로 접근했는지, 새로고침인지 판별하기 위한 값
  //   localStorage.setItem("search", false);

  //   if (localStorage.getItem("q")) {
  //     setValue(localStorage.getItem("q"));
  //   }
  //   const fetching = async () => {
  //     const res = await getCategory();
  //     setCategories(res.data.result.data);
  //   };

  //   fetching();
  // }, []);
  useEffect(() => {
    const fetching = async () => {
      const res = await getCategory();
      setCategories(res.data.result.data);
    };
    fetching();
  }, []);

  return (
    <div className={`${styles.Layout}`}>
      <div className={styles.Section}>
        <ul className={styles.NavList}>
          <li className={styles.NavItem} style={{ width: "fit-content" }}>
            <div
              className={`${styles.LogoBox} ${rootStyles.Hover}`}
              onClick={() => navigate("/")}
            >
              <img style={{ width: "auto", height: "70px" }} src={Logo} />
            </div>
          </li>
          <li className={styles.NavItem}>
            <div className={styles.SearchBoxLayout}>
              <div className={styles.SearchBox}>
                <input
                  onKeyDown={keydownCallback}
                  onFocus={() => focusAndBlur("focus")}
                  onBlur={() => focusAndBlur("blur")}
                  className={styles.SearchBoxInput}
                  value={value}
                  onChange={onChange}
                />
                <div className={styles.SearchButtonBox}>
                  {value.length > 0 && (
                    <div
                      className={`${styles.SearchButtonItem} ${rootStyles.Hover}`}
                      onClick={handleTextRemoveClick}
                    >
                      <IoIosClose size={28} color={"rgb(128,128,128,0.7)"} />
                    </div>
                  )}

                  <AiOutlineSearch size={26} color={"rgb(255, 192, 0)"} />

                  <div></div>
                </div>
              </div>
            </div>
          </li>
        
          <li className={styles.NavItem} style={{ width: "fit-content" }}>
          <div className={styles.ToolBoxLayout}>
              <div
                className={rootStyles.Button}
                onClick={() => navigate("/upload")}
              >
                <MdOutlineDriveFolderUpload size={24} />
                상품등록
              </div>
              <div 
              className={rootStyles.Button}
              onClick={() => navigate("/sign-in")}
              >
              로그인 / 회원가입</div>
            </div>
          </li>
        </ul>
      </div>
      
      <div className={styles.Section}>
        <div
          className={styles.CategoryIconBox}
          onClick={handleCategoryIconClick}
        >
          <RxHamburgerMenu size={26} />
          <div style={{ marginLeft: "10px" }}>카테고리</div>
        </div>
        <ul className={styles.CategoryList}>
          {categories?.map((item, idx) => {
            return (
              <li
                key={item.id}
                className={styles.CategoryItem}
                onClick={() => handleCategoryClick(item, idx)}
              >
                {item.category}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.BottomNav}>
        <ul className={styles.BottomNavList}>
          {/* 
          <input type="radio" name="mobile-nav-group" id="home" defaultChecked />
          <input type="radio" name="mobile-nav-group" id="disable" />
          <input type="radio" name="mobile-nav-group" id="upload" />
          <input type="radio" name="mobile-nav-group" id="user" />
          <input type="radio" name="mobile-nav-group" id="more" /> */}
          <input
            style={{ display: "none" }}
            type="radio"
            name="mobile-nav-group"
            id="home"
            defaultChecked
            value="home"
          />

          <label
            htmlFor="home"
            onClick={() => navigate("/")}
            className={styles.BottomNavItem}
          >
            <AiOutlineHome size={32} />
          </label>

          <input
            style={{ display: "none" }}
            type="radio"
            name="mobile-nav-group"
            id="disable"
            value="disable"
          />

          <label htmlFor="disable" className={styles.BottomNavItem}>
            <AiOutlineWarning size={32} />
          </label>

          <input
            style={{ display: "none" }}
            type="radio"
            name="mobile-nav-group"
            id="upload"
            value="upload"
          />

          <label
            htmlFor="upload"
            className={styles.BottomNavItem}
            onClick={() => navigate("/upload")}
          >
            <BsPlusSquare size={26} />
          </label>

          <input
            style={{ display: "none" }}
            type="radio"
            name="mobile-nav-group"
            id="user"
            value="user"
          />

          <label htmlFor="user" className={styles.BottomNavItem}>
            <BiUser size={30} />
          </label>

          <input
            style={{ display: "none" }}
            type="radio"
            name="mobile-nav-group"
            id="more"
            value="more"
          />

          <label htmlFor="more" className={styles.BottomNavItem}>
            <BsThreeDots size={30} />
          </label>
        </ul>
      </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
