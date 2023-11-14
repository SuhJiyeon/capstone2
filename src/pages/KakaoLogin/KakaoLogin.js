import React from 'react';
import axios from 'axios';
import styles from './Kakao.module.css';
//KOE101  잘못된 앱 키 또는 앱 키 타입을 사용한 경우 
//[내 애플리케이션] > [앱 키]에서 발급받은 앱 키를 올바르게 사용했는지 확인합니다.

//내 카카오디밸로퍼 앱키: 9ea4dd47c0f26443688145130370a10a
//백 앱키: e2310fc970e676a7e88634db16da07b2

function KakaoLogin() {
  const handleKakao = () => {
    const REDIRECT_URI = 'https://www.assac.shop/login/oauth2/code/kakao';
    const REST_API_KEY = 'e2310fc970e676a7e88634db16da07b2';

    const handleKakaoLoginClick = () => {
      const KAKAO_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code`;

      window.location.href = KAKAO_URI; // Redirect to Kakao login page
    };

    return (
      <div className={styles.container}>
        <div className={styles.buttonContainer}>
          <button onClick={handleKakaoLoginClick} className={styles.kakaoButton}>
            카카오 로그인
          </button>
        </div>
      </div>
    );
  };

  return <div>{handleKakao()}</div>;
}

export default KakaoLogin;
