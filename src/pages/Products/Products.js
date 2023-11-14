import Pagination from '@mui/material/Pagination';
import React, { useEffect, useState } from 'react';
import { FaMehBlank } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { getSearchData, getSearchDataViewCount } from '../../apis/search';
import Blank from "../../assets/error.jpg";
import mainStyles from "../Main/Main.module.css";
import styles from "./Products.module.css";

const Products = props => {
  const location = useLocation()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [productsFirstLine, setProductsFirstLine] = useState([])
  const [productsSecondLine, setProductsSecondLine] = useState([])


  useEffect(() => {
    if (location.state?.searchResult) {


      setProducts(location?.state?.searchResult)
      const result = location?.state?.searchResult

      const left = location?.state?.searchResult?.slice(0, result.length / 2)
      const right = location?.state?.searchResult?.slice(result.length / 2, result.length)
      setProductsFirstLine(left)
      setProductsSecondLine(right)
      setPageInfoDto(location.state.pageInfoDto)
      return;
    } else {


    }
  }, [location])

  const [pageInfoDto, setPageInfoDto] = useState({})
  const [page, setPage] = useState(0)
  const [pageviewValue, setPageViewValue] = useState(0)
  const fetching = async (page, sort) => {


    if (sort === "viewCount") {
      const result = await getSearchDataViewCount("item", localStorage.getItem("q"), page ? page : 0)

      const titleResult = await getSearchDataViewCount("title", localStorage.getItem("q"), page ? page : 0)


      if (result?.response?.status === 404 && titleResult?.response?.status === 404) {

        setPageInfoDto({ totalPages: 0 })
        return;
      }

      const searchResult = [...result?.data?.result?.data?.boards, ...titleResult?.data?.result?.data?.boards]


      const pageInfoDto = result?.data?.result?.data?.pageInfoDto
      const itemTotalPages = result?.data?.result?.data?.pageInfoDto?.totalPages

      const searchPageInfoDto = titleResult?.data?.result?.data?.pageInfoDto?.totalPages

      const maxTotalPage = Math.max(itemTotalPages, searchPageInfoDto)
      setPageInfoDto({
        ...pageInfoDto,
        totalPages: maxTotalPage
      })


      const map = new Map();
      // setProducts([])
      for (const item of searchResult) {
        map.set(JSON.stringify(item), item); // name, company가 모두 같은 객체 요소는 제외한 맵 생성
      }
      const filter = [...map.values()];
      setProducts(filter)


    } else if (sort === "new") {

      const result = await getSearchData("item", localStorage.getItem("q"), page ? page : 0)

      const titleResult = await getSearchData("title", localStorage.getItem("q"), page ? page : 0)


      if (result?.response?.status === 404 && titleResult?.response?.status === 404) {

        setPageInfoDto({ totalPages: 0 })
        return;
      }

      const searchResult = [...result?.data?.result?.data?.boards, ...titleResult?.data?.result?.data?.boards]


      const pageInfoDto = result?.data?.result?.data?.pageInfoDto
      const itemTotalPages = result?.data?.result?.data?.pageInfoDto?.totalPages

      const searchPageInfoDto = titleResult?.data?.result?.data?.pageInfoDto?.totalPages

      const maxTotalPage = Math.max(itemTotalPages, searchPageInfoDto)
      setPageInfoDto({
        ...pageInfoDto,
        totalPages: maxTotalPage
      })


      const map = new Map();
      for (const item of searchResult) {
        map.set(JSON.stringify(item), item); // name, company가 모두 같은 객체 요소는 제외한 맵 생성
      }
      const filter = [...map.values()];
      setProducts(filter)
    }





  }

  useEffect(() => {

    if (products.length !== 0) {
      return;
    }



    fetching()


  }, [])



  const handleItemClick = (e, item) => {

    navigate(`/products/${item?.id}`, { state: { id: item.id } })
  }


  const pageOnChange = (e, value) => {
    const temp = value <= 0 ? 0 : value - 1
    const sort = sessionStorage.getItem('sort')
    if (sort === 'viewCount') {
      fetching(temp, "viewCount")
      setPageViewValue(value)
      setPage(temp)

    } else {
      fetching(temp, "new")
      setPageViewValue(value)
      setPage(temp)
    }





  }

  const handleViewCount = async () => {
    sessionStorage.setItem('sort', 'viewCount')
    fetching(0, "viewCount")
  }

  const handleNew = async () => {
    fetching(0, "new")
    sessionStorage.setItem('sort', 'new')
  }
  return (
    <div className={styles.Layout}>
      <div className={styles.Section}>
        <div className={styles.Title}>
        <div></div>
          {/*<div>"{localStorage.getItem("q")}" 검색결과</div>*/}
          
          <div className={styles.SortBox}>
            <input type='radio' id='viewCount' name='sort' />
            <label htmlFor='viewCount' className={styles.SortItem} onClick={handleViewCount}>조회순</label>
            |
            <input type='radio' id='new' name='sort' />

            <label htmlFor='new' className={styles.SortItem} onClick={handleNew}>최신순</label>
            |
            {/* <div className={styles.SortItem}>저가순</div> */}
            {/* | */}
            {/* <div className={styles.SortItem}>고가순</div> */}
          </div>
        </div>
      </div>
      <div className={styles.Section}>
        <div className={styles.ProductListBoxDesktop}>
          <ul className={styles.ProductList}>
            {products.map((item, idx) => {

              return (
                <li className={styles.ProductItem} onClick={(e) => handleItemClick(e, item)} key={idx}>
                  <div className={styles.ItemTitle}>
                    {item?.writer}
                  </div>
                  <div className={styles.ItemContentBox}>
                    {item?.images?.length <= 0 &&
                      <img className={styles?.ItemImage} src={Blank} />
                    }
                    <img src={item?.images?.[0]?.accessUrl
                    } className={styles?.ItemImage} />
                    {/* <div className={styles.ImageBox} style={{ backgroundImage: `url(${Image01})`, backgroundSize: "cover", backgroundPosition: "center" }}></div> */}
                    {/* <div className={styles.ImageBox} style={{ backgroundImage: `url(http://13.209.24.112:8080/home/ec2-user/store/${item.images?.[0]?.storedName}`, backgroundSize: "cover", backgroundPosition: "center" }}></div> */}


                    <div className={styles.ItemInfoBox}>
                      <div className={styles.ImageName}>
                        {item?.itemName}

                      </div>
                      <div className={styles.ImageTitle}>
                        {item?.title}

                      </div>
                      <div className={styles.ImageDesc}>{item?.itemName}

                      </div>
                      <div className={mainStyles.ItemOptions}>
                        {/* <div>
                          <AiTwotoneHeart size={24} color="red" />

                        </div> */}

                      </div>
                    </div>

                  </div>
                  <div className={styles.ItemUploadDateBox}>
                    <div className={styles.ItemUploadDate}>
                      {item.createdDate?.[0]}.
                      {item.createdDate?.[1]}.
                      {item.createdDate?.[2]} {""}


                      <span style={{ marginLeft: "10px" }}>
                        {item.createdDate?.[3]}:
                        {item.createdDate?.[4]}
                      </span>

                    </div>

                  </div>


                </li>
              )
            })}
          </ul>
          {products?.length <= 0 && <div className={styles.BlankItemBox}>
            <FaMehBlank size={60} color="#ffcc24" />
            관련 데이터가 없어요 <br />

          </div>}
        </div>
        <div className={styles.ProductListBoxMobile}>
          <ul className={styles.ProductList}>
            {productsFirstLine.map((item, idx) => {
              return (
                <li className={styles.ProductItem} onClick={(e) => handleItemClick(e, item)} key={idx}>
                  <div className={styles.ItemTitle}>
                    {item?.writer}
                  </div>
                  <div className={styles.ItemContentBox}>
                    {item?.images?.length <= 0 &&
                      <img className={styles?.ItemImage} src={Blank} />
                    }
                    <img src={item?.images?.[0]?.accessUrl
                    } className={styles?.ItemImage} />
                    {/* <div className={styles.ImageBox} style={{ backgroundImage: `url(${Image01})`, backgroundSize: "cover", backgroundPosition: "center" }}></div> */}
                    {/* <div className={styles.ImageBox} style={{ backgroundImage: `url(http://13.209.24.112:8080/home/ec2-user/store/${item.images?.[0]?.storedName}`, backgroundSize: "cover", backgroundPosition: "center" }}></div> */}


                    <div className={styles.ItemInfoBox}>
                      <div className={styles.ImageName}>
                        {item?.itemName}

                      </div>
                      <div className={styles.ImageTitle}>
                        {item?.title}

                      </div>
                      <div className={styles.ImageDesc}>{item?.itemName}
                        Lourem ipsum dolor sit amet, Lourem ipsum dolor sit amet, Lourem ipsum dolor sit amet, Lourem ipsum dolor sit amet,                         Lourem ipsum dolor sit amet,       Lourem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, eget ultricies n
                      </div>
                      <div className={mainStyles.ItemOptions}>
                        {/* <div>
                          <AiTwotoneHeart size={24} color="red" />

                        </div> */}

                      </div>
                    </div>

                  </div>
                  <div className={styles.ItemUploadDateBox}>
                    <div className={styles.ItemUploadDate}>
                      {item.createdDate?.[0]}.
                      {item.createdDate?.[1]}.
                      {item.createdDate?.[2]} {""}


                      <span style={{ marginLeft: "10px" }}>
                        {item.createdDate?.[3]}:
                        {item.createdDate?.[4]}
                      </span>

                    </div>

                  </div>


                </li>
              )
            })}
          </ul>

          <ul className={styles.ProductList}>
            {productsSecondLine.map((item, idx) => {
              return (
                <li className={styles.ProductItem} onClick={(e) => handleItemClick(e, item)} key={idx}>

                  <div className={styles.ItemContentBox}>
                    <img className={styles?.ItemImage} src={Blank} />
                    {item?.images?.length <= 0 &&
                      <img className={styles?.ItemImage} src={Blank} />
                    }
                    <img src={item?.images?.[0]?.accessUrl
                    } className={styles?.ItemImage} />
                    {/* <div className={styles.ImageBox} style={{ backgroundImage: `url(${Image01})`, backgroundSize: "cover", backgroundPosition: "center" }}></div> */}
                    {/* <div className={styles.ImageBox} style={{ backgroundImage: `url(http://13.209.24.112:8080/home/ec2-user/store/${item.images?.[0]?.storedName}`, backgroundSize: "cover", backgroundPosition: "center" }}></div> */}


                    <div className={styles.ItemInfoBox}>
                      <div className={styles.ImageName}>
                        {item?.itemName}

                      </div>
                      <div className={styles.ImageTitle}>
                        {item?.title}

                      </div>
                      <div className={styles.ImageDesc}>{item?.itemName}
                        Lourem ipsum dolor sit amet, Lourem ipsum dolor sit amet, Lourem ipsum dolor sit amet, Lourem ipsum dolor sit amet,                         Lourem ipsum dolor sit amet,       Lourem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, eget ultricies n
                      </div>
                      <div className={mainStyles.ItemOptions}>
                        {/* <div>
                          <AiTwotoneHeart size={24} color="red" />

                        </div> */}

                      </div>
                    </div>

                  </div>
                  <div className={styles.ItemUploadDateBox}>
                    <div className={styles.ItemUploadDate}>
                      {item.createdDate?.[0]}.
                      {item.createdDate?.[1]}.
                      {item.createdDate?.[2]} {""}


                      <span style={{ marginLeft: "10px" }}>
                        {item.createdDate?.[3]}:
                        {item.createdDate?.[4]}
                      </span>

                    </div>

                  </div>


                </li>
              )
            })}
          </ul>



          {productsFirstLine?.length <= 0 && productsSecondLine?.length <= 0 && <div className={styles.BlankItemBox}>
            <FaMehBlank size={60} color="#ffcc24" />
            관련 데이터가 없어요 <br />

          </div>}
        </div>

        <div className={styles.PaginationWrapper}>

          {/* <Pagination count={10} shape="rounded" /> */}
          <Pagination count={pageInfoDto?.totalPages} page={pageviewValue} onChange={pageOnChange} />

        </div>

      </div>
    </div>
  );
};



export default Products;