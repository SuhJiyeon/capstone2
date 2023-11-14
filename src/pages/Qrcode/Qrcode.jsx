import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import styles from './Qrcode.module.css';

const QRCodeGenerator = () => {
  const [serialNumber, setSerialNumber] = useState('');
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');

  const handleInputChange = (e) => {
    setSerialNumber(e.target.value);
    setError('');
  };

  const generateQRCode = () => {
    if (serialNumber.startsWith('LOST')) {
      setUrl(`https://www.assac.shop/api/board/serial/${serialNumber}`);
      setError('');
    } else {
      setError('입력하신 번호는 제품의 고유한 일련번호이므로, QR Code를  제공하지 않습니다.');
      setUrl('');
    }
  };


  return (
    <div className={styles.qrcodeGeneratorContainer}>
      <h1>QR Code 생성하기</h1>
      <div className={styles.yellowBar}></div>
      <input
        type="text"
        value={serialNumber}
        onChange={handleInputChange}
        placeholder="Enter serial number"
      />
      <button onClick={generateQRCode}>QR Code 생성하기</button>
      <div className={styles.qrcodeContainer}>
        {error && <p className={styles.errorMessage}>{error}</p>}
        {url && <QRCode value={url} />}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
