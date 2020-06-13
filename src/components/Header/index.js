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
                <Link to="/">HOME</Link>
                <span className="divisor" />
                <Link to="/tasks">NEW TASK</Link>
                <span className="divisor" />
                <Link to="/qr-code"><a href="#">SYNC</a></Link>
                <span className="divisor" />
                <button onClick={clickNotification} >
                    <img src={bell} alt="Notification" />
                    <span>{lateCount}</span>
                </button>

            </S.RightSide>
        </S.Container>
    )
}

export default Header;
