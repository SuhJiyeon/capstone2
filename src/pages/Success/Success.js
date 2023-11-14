import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Success.module.css';
const Success = props => {
  const navigate = useNavigate()
  return (
    <div className={styles.Layout}>
      <div className={styles.box}>
        상품등록이 완료되었습니다.
        <br />
        시리얼넘버가 없다면
        <br />
        QR코드를 발급해주세요!

        <div className={styles.ButtonGroup}>
          <button className='button QR' onClick={() =>  navigate('/qrcode')}>QR생성</button>
          <button className='button MAIN' onClick={() => navigate('/')}>메인 페이지로</button>

        </div>
      </div>
    </div>
  );
};



export default Success;