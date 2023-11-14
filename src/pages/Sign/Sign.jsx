import styles from './Sign.module.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [pw, setPw] = useState('');
  const [pwValid, setPwValid] = useState(true);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [notAllow, setNotAllow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailValid(true);
  };

  const handleId = (e) => {
    setId(e.target.value);
  };


  const handlePw = (e) => {
    setPw(e.target.value);
    setPwValid(true);
  };


  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleNickname = (e) => {
    setNickname(e.target.value);
  };


  const onClickConfirmButton = async () => {
    // Validation logic for email and password
    // ...

 
      axios.post(`https://www.assac.shop/api/user/sign-up`, {
        email,
        username:id,
        name,
        nickname,
        password:pw,
        
      })

      .then(function (response) {
        if (response.code === 201) {
          console.log(response);
          alert('회원가입이 완료되었습니다.');
          navigate('/sign-in');
        }
        if (response.code === 409) {
          console.log(response);
          alert(response.result.message);
        } else {
          alert('회원가입이 완료되었습니다.');
          navigate('/sign-in');
        }
      })
      .catch(function (error) {
        alert('회원가입 실패. 다시 입력해 주세요.');
        
        console.log(error);
      });
  };

  //중복확인
  

  return (
    <div className={styles.page}>
      <div className={styles.titleWrap}>회원가입</div>

      <div className={styles.contentWrap}>
        <div className={styles.inputTitle}>이메일</div>
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            type="text"
            placeholder="이메일"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className={styles.errorMessageWrap}>
          {!emailValid && email.length > 0 && (
            <div>올바른 이메일을 입력해주세요.</div>
          )}
        </div>

        
        <div style={{ marginTop: '26px' }} className={styles.inputTitle}>
          사용자 아이디
        </div>
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            type="text"
            placeholder="사용자 아이디"
            value={id}
            onChange={handleId}
          />
        </div>


        <div style={{ marginTop: '26px' }} className={styles.inputTitle}>
          비밀번호
        </div>
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            type="text"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            value={pw}
            onChange={handlePw}
          />
        </div>
        <div className={styles.errorMessageWrap}>
          {!pwValid && pw.length > 0 && (
            <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
          )}
        </div>

        <div style={{ marginTop: '26px' }} className={styles.inputTitle}>
          이름
        </div>
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            type="text"
            placeholder="이름"
            value={name}
            onChange={handleName}
          />
        </div>

        <div style={{ marginTop: '26px' }} className={styles.inputTitle}>
          닉네임
        </div>
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={handleNickname}
          />
        </div>

        <div>
          <button
            onClick={onClickConfirmButton}
            className={styles.bottomButton}
            disabled={notAllow}
          >
            회원가입완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
