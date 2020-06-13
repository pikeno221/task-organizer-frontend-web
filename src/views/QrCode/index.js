import React, { useState, useEffect } from 'react';
import * as S from './styles';
import Qr from 'qrcode.react';

import api from '../../services/api';

// COMPONENTS
import Header from '../../components/Header'
import Footer from '../../components/Footer'

function QrCode() {
  const [lateCount, setLateCount] = useState();

  async function overdueVerify() {
    await api.get(`/tasks/overdue`, {
      headers: {
        macaddress: 1234
      }
    })
      .then(response => {
        setLateCount(response.data.length);
        console.log(response.data.length);
      })
      .catch(error => {
        console.error(error);
      })
  }



  useEffect(() => {
    overdueVerify();
  })

  return (
    <S.Container>
      <Header lateCount={lateCount} />
      <S.Content>
        <h1>CAPTURE THE QRCODE FROM APP</h1>

        <S.QrCodeArea>
          <Qr value='getmacaddress' size={350} />
        </S.QrCodeArea>

        <p>Your Web Todo Tasks will be sync with ur smartphone</p>

        <S.ValidationCode>
          <span>Type the number that shows on your cellphone</span>
          <input type="text"></input>
          <button type="button">SYNC</button>
        </S.ValidationCode>
      </S.Content>
      <Footer />
    </S.Container>
  )


}


export default QrCode;