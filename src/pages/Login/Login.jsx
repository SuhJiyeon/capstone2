import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  const handleId = (e) => {
    setId(e.target.value);
  };

  const handlePw = (e) => {
    setPw(e.target.value);
  };

  const onClickConfirmButton = () => {
    axios.post('https://www.assac.shop/api/user/sign-in', {
      username: id,
      password: pw,
    })
      .then(function (response) {

        alert('로그인 성공!');
        // *객체 구조를 정확히
        console.log(response.data.result.data.accessToken, "토큰")
        const { accessToken, refreshToken } = response?.data?.result?.data;
        localStorage.setItem('login-token', accessToken);
        goToMain();

        // 토큰 재발급
        axios.post('https://www.assac.shop/api/user', {
          refreshToken: refreshToken,
        })
          .then(function (response) {

            const newOriginToken = response?.data?.result?.data?.accessToken;
            localStorage.setItem('login-token', newOriginToken);
            console.log('토큰 재발급 완료:', newOriginToken);
          })
          .catch(function (error) {
            console.log('토큰 재발급 실패:', error);
          });
      })
      .catch(function (error) {
        console.log(error);
        alert('로그인 실패.');
      });
  };

  const goToMain = () => {
    navigate('/');
  };

  const goToSign = () => {
    navigate('/sign-up');
  };

  const goToKakaoLogin = () => {
    navigate('/kakao-login');
  };



  return (
    <div className={styles.page}>
      <div className={styles.titleWrap}>로그인</div>

      <div className={styles.contentWrap}>
        <div className={styles.inputTitle}>사용자 아이디</div>
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            type="text"
            placeholder="사용자 아이디를 입력하시오"
            value={id}
            onChange={handleId}
          />
        </div>
      </div>

      <div className={styles.contentWrap}>
        <div className={styles.inputTitle}>비밀번호</div>
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            type="text"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상 입력하시오"
            value={pw}
            onChange={handlePw}
          />
        </div>
      </div>



      <div>
        <button
          onClick={onClickConfirmButton}
          className={styles.bottomButton}
        >
          확인
        </button>
      </div>

      <div>
        <button onClick={goToKakaoLogin} className={styles.kakaoButton}>
          카카오 로그인
        </button>
      </div>

      <div>
        <button onClick={goToSign} className={styles.signButton}>
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Login;