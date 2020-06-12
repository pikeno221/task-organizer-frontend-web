import React, { useMemo } from 'react';
import { format } from 'date-fns';
import * as S from './styles';
import categoryIcons from '../../utils/categoryIcons'


function TaskCard({ category, title, when, done }) {

    const date = useMemo(() => format(new Date(when), 'dd/MM/yyyy'));
    const hour = useMemo(() => format(new Date(when), 'HH:mm'));

    return (
        <S.Container done={done}>
            <S.TopCard>
                <img src={categoryIcons[category]} alt="Task Icon" />
                <h3>{title}</h3>
            </S.TopCard>
            <S.BottomCard>
                <strong>{date}</strong>
                <span>{hour}</span>
            </S.BottomCard>
        </S.Container>
    )
}

export default TaskCard;
