import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Detail from './pages/Detail/Detail';
import Main from './pages/Main/Main';
import Products from './pages/Products/Products';
import Success from './pages/Success/Success';
import Upload from './pages/Upload/Upload';

import CategoryMove from './pages/CategoryMove/CategoryMove';
import Login from './pages/Login/Login';
import Sign from './pages/Sign/Sign';
import KakaoLogin from './pages/KakaoLogin/KakaoLogin';
import Qrcode from './pages/Qrcode/Qrcode';




function App() {
  return (
    <div className="App" >
      <BrowserRouter>
        <Header />
        <Routes>

          <Route path='/' element={<Main />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<Detail />} />

          <Route path='/upload' element={<Upload />} />
          <Route path='/success' element={<Success />} />

          <Route path='/sign-in' element={<Login />} />
          <Route path='/sign-up' element={<Sign />} />
          <Route path='/kakao-login' element={<KakaoLogin />} />
          
          <Route path='/qrcode' element={<Qrcode />} />


          <Route path='/categorymove' element={<CategoryMove />} />



        </Routes>

      </BrowserRouter >


    </div >

  );
}

export default App;
