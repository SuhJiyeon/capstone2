import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";


import { AiTwotoneHeart } from 'react-icons/ai';
import { RiAlarmWarningFill } from "react-icons/ri";
import Blank from "../../assets/error.jpg";
import Image03 from "../../assets/slide1.jpg";
import Image01 from "../../assets/slide2.jpg";
import Image02 from "../../assets/slide3.jpg";
import styles from "./Main.module.css";


import { useNavigate } from 'react-router-dom';
import { getRecentPost } from "../../apis/board";
import { getCategory } from "../../apis/category";


// 메인 최상단 슬라이드 배너 커스텀 하는 함수
const CustomSlider = () => {

  // 현재 기본 세팅이며 추후에 필요에 따라 수정 가능
  // settings 객체에 값을 넣어서 처리
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrow: false,
    autoplaySpeed: 2000
  };
  return (

    <Slider {...settings} style={{

    }}>
      <div className={styles.SlideItem}>
        <img alt='image' src={Image01} width={"100%"} style={{ position: "absolute", top: 0 }} />
      </div>
      <div className={styles.SlideItem}>
        <img alt='image' src={Image03} width={"100%"} style={{ position: "absolute", top: 0 }} />
      </div>
      <div className={styles.SlideItem}>
        <img alt='image' src={Image02} width={"100%"} style={{ position: "absolute", top: 0 }} />
      </div>
    </Slider>


  );
}
const Main = props => {
  const navigate = useNavigate()
  const handleProductClick = (e, item) => {
    navigate(`/products/${item.id}`, { state: item })
    // alert('상세 페이지 이동 로직을 작성 해주세요')
  }

  const handleReportIconClick = (e) => {
    // 이벤트 버블링 방지
    e.stopPropagation();
    return alert('신고하기 버튼')
  }
  const [recentPosts, setRecentPosts] = useState([])

  useEffect(() => {
    const test = async () => {
      const data = await getCategory()
      const post = await getRecentPost()

      console.log(post.data.result.data, "post")
      console.log(data, "Data")
      // console.log(post, "post")


      setRecentPosts([...post.data.result.data])

      // for (let i = 0; i <= 5; i++) {
      //   data.push(
      //     {
      //       "id": 1,
      //       "title": "test",
      //       itemName: "test",
      //       "content": "test",
      //       "writer": "test",
      //       "category": "test",
      //       "price": 1000,
      //       "images": [
      //         {
      //           "id": 1,
      //           "src": 'https://chrkb1569.s3.ap-northeast-2.amazonaws.com/0e4778f8-9869-468e-bd44-7010be09f872-1.jpeg',
      //           "storedName": "test",
      //           "originalName": "test",
      //           "size": 1000,
      //           "type": "test",
      //           "postId": 1
      //         }
      //       ],
      //       "createdAt": "2021-08-05T09:00:00.000Z",
      //       "updatedAt": "2021-08-05T09:00:00.000Z"
      //     }
      //   )
      // }


    }

    test()
  }, [])
  return (
    <div className={styles.Layout}>

      <div className={styles.Section}>
        <div className={styles.Banner}>
          <CustomSlider></CustomSlider>
        </div>

      </div>
      <div className={styles.Section}>
        {/* #list1 */}
        <div className={styles.RecentRegistrationProudctBox}>
          <h2>최근 등록된 상품</h2>
          <ul className={styles.RecentProductList}>




            {recentPosts?.map((item, idx) => {

              return (
                <li className={styles.RecentProductItem} onClick={(e) => handleProductClick(e, item)}>
                  <div className={styles.RecentProductItemHeader}>
                    <div className={styles.RecentProudctItemName}>
                      {item.writer}
                      <RiAlarmWarningFill color="red" size={20} onClick={handleReportIconClick} />
                    </div>

                    {/* <div className={styles.RecentProductItemToolBox}>test</div> */}
                  </div>
                  <div className={styles.ItemContent}>
                    <div className={styles.ItemImageBox}>
                      {item.images.length <= 0 &&
                        <img className={styles?.ItemImage} src={Blank} />
                      }
                      <img src={item.images[0]?.accessUrl
                      } className={styles?.ItemImage} />
                      {/* <img src={`url(http://13.209.24.112:8080/home/ec2-user/store/${item.images?.[0]?.storedName})`} className={styles?.ItemImage} /> */}

                    </div>
                    <div className={styles.ItemTitle}>{item?.title}</div>
                    <div className={styles.ItemDesc}>{item?.itemName}</div>
                    <div className={styles.ItemOptions}>
                      <AiTwotoneHeart size={24} color="red" />

                      <div className={styles.ItemUploadDate}>얼마전</div>
                    </div>
                  </div>
                </li>
              )
            })}








          </ul>

        </div>

        {/* #list2 */}


        {/* #list3 */}


        {/* #list4 */}



      </div>
    </div>
  );
};

Main.propTypes = {

};

export default Main;