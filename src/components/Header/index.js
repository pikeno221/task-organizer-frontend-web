import React from 'react';
import * as S from './styles';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png'
import bell from '../../assets/bell.png'

function Header({ lateCount, clickNotification }) {
    return (
        <S.Container>
            <S.LeftSide>
                <Link to="/">
                    <img src={logo} alt="Logo" />
                </Link> 
            </S.LeftSide>
            <S.RightSide>
                <Link to="/">INÍCIO</Link>
                <span className="dividir" />
                <Link to="/tasks">NOVA TAREFA</Link>
                <span className="dividir" />
                <a href="#">SINCRONIZAR CELULAR</a>
                <span className="dividir" />
                <button onClick={clickNotification} >
                    <img src={bell} alt="Notification" />
                    <span>{lateCount}</span>
                </button>

            </S.RightSide>
        </S.Container>
    )
}

export default Header;
