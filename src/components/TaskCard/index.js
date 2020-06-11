import React from 'react';
import * as S from './styles';

import defaultIcon from '../../assets/default.png';

function TaskCard() {
    return (
        <S.Container>
            <S.TopCard>
                <img src={defaultIcon} alt="Task Icon" />
                <h3>Task Title</h3>
            </S.TopCard>
            <S.BottomCard>
                <strong>17/10/2020</strong>
                <span>10:00</span>
            </S.BottomCard>
        </S.Container>
    )
}

export default TaskCard;
