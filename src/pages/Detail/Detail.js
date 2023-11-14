import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useLocation } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getProductGeo, getProductsItem } from "../../apis/board";
import Map from "../../components/Map";
import styles from "./Detail.module.css";
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};
const Detail = () => {
  const [showImageURL, setShowImageURL] = useState("")
  const location = useLocation()
  const [product, setProduct] = useState(null)
  const [liveLocation, setLiveLocation] = useState({ latitude: 0, longitude: 0 })
  const [numberToggle, setNumberToggle] = useState(false)
  const serialNumberCheck = () => {

  }
  const handleNumberToggle = (serialNumber) => {

    const promptResult = prompt('시리얼 번호를 입력 해주세요', '시리얼 번호를 입력 해주세요');
    if (promptResult !== serialNumber) {
      alert('시리얼 넘버가 일치하지 않습니다.')
    } else {
      alert('시리얼 넘버가 일치 합니다!')
    }
    // setNumberToggle(!numberToggle)
  }


  useEffect(() => {

    // 프로덕트 정보 가져오기
    (async () => {
      const res = await getProductsItem(location.state)
      const product = res?.data?.result?.data
      setProduct(product)
      setShowImageURL(product?.images[0]?.accessUrl)
    })();



    // 라즈베리 파이 위치 가져오기   
    (async () => {
      const res = await getProductsItem(location.state)
      const product = res?.data?.result?.data
      const geoDataTemp = await getProductGeo();
      const geoData = geoDataTemp?.data?.result?.data

      setLiveLocation({ latitude: Number(geoData?.latitude), longitude: Number(geoData?.longitude) })

    })();

  }, [location])

  useEffect(() => {
    console.log(product, "product")
  }, [product])

  const slideContainerRef = useRef(null)




  function translateContainer(direction) {
    const selectedBtn = (direction === 1) ? 'prev' : 'next';
    slideContainerRef.current.style.transitionDuration = '500ms';
    slideContainerRef.current.style.transform = `translateX(${direction * (100 / 5)}%)`;
    slideContainerRef.current.ontransitionend = () => reorganizeEl(selectedBtn);
  }

  function reorganizeEl(selectedBtn) {
    slideContainerRef.current.removeAttribute('style');
    (selectedBtn === 'prev') ? slideContainerRef.current.insertBefore(slideContainerRef.current.lastElementChild, slideContainerRef.current.firstElementChild) : slideContainerRef.current.appendChild(slideContainerRef.current.firstElementChild);
  }

  const handleButtonClick = (type) => {
    if (type === "prev") {
      translateContainer(1)
    } else {
      translateContainer(-1)
    }
  }

  const handleSlideItemCLick = (item) => {
    setShowImageURL(item.accessUrl)
  }
  return (
    <div className={styles.Layout}>
      {/* <h1>Detail</h1> */}
      <div className={styles.Section}>
        <div className={styles.SectionContentBox}>
          <div className={styles.LeftBox}>
            <div className={styles.ImageBox}>
              <img src={showImageURL} width={"100%"} height={"100%"} />
            </div>
            {product?.images?.length > 1 &&
              <div className={styles.ImageSlideWrapper}>
                <div className={styles.SlideContainer} ref={slideContainerRef}>
                  {product?.images?.map((item) => {
                    return (
                      <div className={styles.SlideItem} onClick={() => handleSlideItemCLick(item)}>
                        <img width={100} height={100} src={item?.accessUrl} />
                      </div>
                    )
                  })}
                </div>




                <div className={styles.ButtonContainer}>
                  <div className={styles.SlideArrowButton} onClick={() => handleButtonClick("prev")}>

                    <IoIosArrowBack size={30} />
                  </div>
                  <div className={styles.SlideArrowButton} onClick={() => handleButtonClick("next")}>
                    <IoIosArrowForward size={30} />
                  </div>
                </div>

              </div>

            }


          </div>
          <div className={styles.RightBox}>
            <div className={styles.Category}>{product?.category}</div>
            <div className={styles.ItemName}>{product?.itemName}</div>
            <div className={styles.Line}></div>
            <div className={styles.ItemInfo}>
              <div className={styles.ItemTitle}>
                {product?.title}

              </div>
              <div className={styles?.ItemDesc}>
                {product?.content}


              </div>
            </div>
            <div className={styles.Line}></div>
            <div style={{ fontWeight: "bold", fontSize: "1.4rem" }}>카테고리</div>
            <div className={styles.Categories}>
              <span className={styles.Item}>{product?.category}</span>
              <span>{">"}</span>
              <span className={styles.Item}>{product?.subCategory}</span>
              <span>{">"}</span>
              <span className={styles.Item}>{product?.leafCategory}</span>


            </div>
            <div className={styles.Line}></div>
            <button className={styles.CheckNumber} onClick={() => handleNumberToggle(product?.serialNumber)}>
              {/* {numberToggle ? "시리얼 넘버 숨기기" : "시리얼 넘버 확인"} */}
              시리얼 넘버 확인
            </button>
            {/* {numberToggle && <div className={styles.NumberView}>시리얼 넘버: {product?.serialNumber}</div>} */}
          </div>
        </div>

      </div>


      <div className={styles.Section}>
        <div className={styles.MapTitle}>대략적인 분실 위치</div>
        <Map viewType={"read-only"} location={{ latitude: product?.latitude, longtitude: product?.longitude }}></Map>

        <div className={styles.MapTitle}>실시간 위치</div>

        <Map viewType={"read-only"} location={{ latitude: liveLocation?.latitude, longtitude: liveLocation?.longitude }}></Map>
      </div>

    </div>
  )
}

export default Detail